export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    // @ts-ignore
    const { name, email, id } = user;

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
            provider: "GITHUB",
            providerAccountId: id.toString(),
            scope: "user:email",
          },
        },
      });
    }

    // if the user exists, check if they have a github account
    if (existingUser?.accounts?.some((account) => account.provider === "GITHUB")) {
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
              provider: "GITHUB",
              providerAccountId: id.toString(),
              access_token: tokens.access_token,
              scope: "user:email",
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
