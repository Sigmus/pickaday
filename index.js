import range from "lodash/range";
import "./index.css";
import { last } from "lodash";

const [el] = document.getElementsByClassName("ptd");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getWeekDay(date) {
  const number = date.getDay();
  if (number === 0) {
    return 6;
  }
  //   if (number === 0) {
  //     return 6;
  //   }
  return number - 1;
}

function renderDays(input) {
  const firstDay = getFirstDay(input);
  const lastDay = getLastDay(input);

  console.log("firstDay", firstDay);

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
    .slice(0, getWeekDay(firstDay))
    .reverse();

  const days = previousMonthDays.concat(getDaysMonth(lastDay));

  let snippet = `<h2>${months[input.month]} ${
    input.year
  }</h2><br/><table><tbody><head><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>`;

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

  let newNode = document.createElement("div");
  newNode.innerHTML = `${snippet}</tbody></table>`;
  el.appendChild(newNode);
}

function getDaysMonth(date) {
  return range(1, date.getDate() + 1).map((i) => {
    return new Date(date.getFullYear(), date.getMonth(), i);
  });
}

function getLastDay(input) {
  return new Date(input.year, input.month + 1, 0);
}

function getFirstDay(input) {
  return new Date(input.year, input.month);
}

// console.log(dayjs().set("month", 2));

renderDays({ year: 2020, month: 0 });
renderDays({ year: 2020, month: 1 });
renderDays({ year: 2020, month: 2 });
renderDays({ year: 2020, month: 3 });
renderDays({ year: 2020, month: 4 });
renderDays({ year: 2020, month: 5 });
renderDays({ year: 2020, month: 6 });
renderDays({ year: 2020, month: 7 });
renderDays({ year: 2020, month: 8 });
renderDays({ year: 2020, month: 9 });
renderDays({ year: 2020, month: 10 });
renderDays({ year: 2020, month: 11 });
