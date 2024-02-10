export default oauth.googleEventHandler({
  config: {
    // @ts-ignore
    redirectUrl: "/api/auth/google",
    scope: ["email", "profile"],
  },
  async onSuccess(event, { user, tokens }) {
    // @ts-ignore
    const { email, sub, name } = user;

    // find if there is a user with the same email
    let existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          email,
          name,
          emailVerified: new Date(),
          accounts: {
            access_token: tokens.access_token,
            provider: "GOOGLE",
            providerAccountId: sub,
            scope: "email, profile",
          },
        },
      });
    }

    // if the user exists, check if they have a github account
    if (existingUser?.accounts?.some((account) => account.provider === "GOOGLE")) {
      // if they do, log them in
      await setUserSession(event, {
        user: exclude(existingUser, ["localAccount", "accounts"]),
        loggedInAt: Date.now(),
      });

      return sendRedirect(event, "/");
    }
    // if they don't, create a new account
    else {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          accounts: {
            push: {
              provider: "GOOGLE",
              providerAccountId: sub,
              access_token: tokens.access_token,
              scope: "email, profile",
            },
          },
        },
      });

      await setUserSession(event, {
        user: exclude(existingUser, ["localAccount", "accounts"]),
        loggedInAt: Date.now(),
      });

      return sendRedirect(event, "/");
    }
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    return sendRedirect(event, "/");
  },
});
