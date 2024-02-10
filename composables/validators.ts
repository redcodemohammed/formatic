import { z } from "zod";

export const useValidators = () => {
  const { t } = useI18n();

  const email = z
    .string({
      required_error: t("validators.required", { key: t("common.forms.email") }),
    })
    .email({
      message: t("validators.invalid", { key: t("common.forms.email") }),
    });

  const password = z
    .string({
      required_error: t("validators.required", { key: t("common.forms.password") }),
    })
    .min(8, {
      message: t("validators.min", { key: t("common.forms.password"), value: 8 }),
    });

  const loginSchema = z.object({
    email,
    password,
  });

  return {
    // primitives
    primitives: {
      email,
      password,
    },
    // schemas
    schemas: {
      loginSchema,
    },
  };
};
