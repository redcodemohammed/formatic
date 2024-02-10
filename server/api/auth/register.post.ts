import { z } from "h3-zod";
import { exclude } from "~/server/utils/exclude";

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

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    throw createError({
      status: 409,
      data: [{ message: t("auth.register.email_exists"), code: "email_exists" }],
    });
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      localAccount: {
        password: await hashPassword(password),
      },
    },
  });

  await setUserSession(event, {
    user: exclude(newUser, ["localAccount", "accounts"]),
    loggedInAt: Date.now(),
  });
});
