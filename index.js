import range from "lodash/range";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";

import "./index.css";
import { sortedUniq } from "lodash";
dayjs.extend(weekday);
dayjs.extend(utc);

const [el] = document.getElementsByClassName("ptd");

function renderDays(input) {
  const lastDay = getLastDay(input);

  const daysLastMonth = getDaysMonth(
    getLastDay({
      year: input.month === 0 ? input.year - 1 : input.year,
      month: input.month === 0 ? 11 : input.month - 1,
    })
  )
    .reverse()
    .slice(0, lastDay.getDay() - 1)
    .reverse();

  const days = daysLastMonth.concat(getDaysMonth(lastDay));

  console.log(days);

  let snippet = "<table><tbody>";

  days.forEach((day, index) => {
    if (index % 6 === 0) {
      snippet += `<tr>`;
    }
    snippet += `<td>${day.toString().padStart(2, "0")}`;
    if (index % 6 === 5) {
      snippet += `</tr>`;
    }
  });

  el.innerHTML = `${snippet}</tbody></table>`;
}

function getDaysMonth(date) {
  return range(1, date.getDate() + 1);
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
