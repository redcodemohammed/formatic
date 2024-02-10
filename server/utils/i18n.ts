import { createI18n } from "vue-i18n";
import type { I18nOptions } from "vue-i18n";

import en from "../../locales/en.json";
import ar from "../../locales/ar.json";

const messages: I18nOptions["messages"] = Object.assign({
  en,
  ar,
});

const i18n = createI18n({
  legacy: false,
  locale: "ar",
  availableLocales: ["en", "ar"], // note: you declare two available locales but only have one in messages
  messages,
});

export const { t, locale } = i18n.global;
