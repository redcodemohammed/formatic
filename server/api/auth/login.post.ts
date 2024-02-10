import { z } from "h3-zod";

export default defineEventHandler(async (event) => {
  const schema = z.object({
    email: z
      .string({
        required_error: t("validators.required", { key: t("common.forms.email") }),
      })
      .email({
        message: t("validators.invalid", { key: t("common.forms.email") }),
      }),
    password: z
      .string({
        required_error: t("validators.required", { key: t("common.forms.password") }),
      })
      .min(8, {
        message: t("validators.min", { key: t("common.forms.password"), value: 8 }),
      }),
  });

  const body = await readValidatedBody(event, (b) => schema.safeParse(b));
  if (!body.success)
    throw createError({
      data: body.error.issues,
      status: 400,
    });

  const { email, password } = body.data;

  // find the user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // if the user doesn't exist, throw an error
  if (!user) {
    throw createError({
      status: 400,
      data: [{ message: t("auth.login.invalid_credentials"), code: "invalid_credentials" }],
    });
  }

  // if the user has no local account, throw an error
  if (!user.localAccount) {
    throw createError({
      status: 400,
      data: [{ message: t("auth.login.invalid_credentials"), code: "invalid_credentials" }],
    });
  }

  // compare the password
  const passwordMatch = await verifyPassword(password, user.localAccount.password);

  // if the password doesn't match, throw an error
  if (!passwordMatch) {
    throw createError({
      status: 400,
      data: [{ message: t("auth.login.invalid_credentials"), code: "invalid_credentials" }],
    });
  }

  // set the user session
  await setUserSession(event, {
    user: exclude(user, ["localAccount", "accounts"]),
    loggedInAt: Date.now(),
  });
});
