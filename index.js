import range from "lodash/range";
import "./index.css";

const [el] = document.getElementsByClassName("ptd");

function renderDays(input) {
  const lastDay = getLastDay(input);

  const previousMonthDays = getDaysMonth(
    getLastDay({
      year: input.month === 0 ? input.year - 1 : input.year,
      month: input.month === 0 ? 11 : input.month - 1,
    })
  )
    .map((i) => {
      i.previous = true;
      return i;
    })
    .reverse()
    .slice(0, lastDay.getDay() - 1)
    .reverse();

  const days = previousMonthDays.concat(getDaysMonth(lastDay));

  let snippet =
    "<table><tbody><head><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>";

  days.forEach((date, index) => {
    if (index % 7 === 0) {
      snippet += `<tr>`;
    }
    snippet += `<td class="${
      date.previous ? "previous" : ""
    }">${date.getDate().toString().padStart(2, "0")}`;
    if (index % 7 === 6) {
      snippet += `</tr>`;
    }
  });

  el.innerHTML = `${snippet}</tbody></table>`;
}

function getDaysMonth(date) {
  return range(date.getDate()).map((i) => {
    return new Date(date.getFullYear(), date.getMonth(), i);
  });
}

function getLastDay(input) {
  return new Date(input.year, input.month + 1, 0);
}

// console.log(dayjs().set("month", 2));

// renderDays(2020, 0);
renderDays({ year: 2020, month: 1 });
// renderDays(2020, 2);
// renderDays(2020, 3);
// renderDays(2020, 4);
// renderDays(2020, 5);
// renderDays(2020, 6);
// renderDays(2020, 7);
// renderDays(2020, 8);
// renderDays(2020, 9);
// renderDays(2020, 10);
// renderDays(2020, 11);
