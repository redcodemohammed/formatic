export default (jsDateObject: Date, hideHours = false, locale: "ar" | "en" = "ar") => {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: hideHours ? undefined : "2-digit",
    minute: hideHours ? undefined : "2-digit",
    hour12: true,
  });

  const formattedDate = formatter.format(jsDateObject);
  const [date, time] = formattedDate.split(locale === "ar" ? "في" : "at").map((part) => part.trim());

  return hideHours ? date : `${date} | ${time}`;
};
