export default defineEventHandler((event) => {
  // check if the request has a Accept-Language header
  const acceptLanguage = event.headers.get("Accept-Language");
  if (acceptLanguage) {
    // check if the header includes ar
    if (acceptLanguage.includes("ar")) {
      // set the language to ar
      locale.value = "ar";
    } else {
      // set the language in the i18n middleware
      locale.value = acceptLanguage;
    }
  } else {
    // set the language to ar
    locale.value = "ar";
  }
});
