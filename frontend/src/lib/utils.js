export function formateDate(date) {
  return date.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}