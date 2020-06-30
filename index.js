import range from "lodash/range";
import "./index.css";

const [el] = document.getElementsByClassName("ptd");

const weekStart = "m";

const weekDays = {
  m: ["M", "T", "W", "T", "F", "S", "S"],
  s: ["S", "M", "T", "W", "T", "F", "S"],
};

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

function renderDays(input) {
  const firstDay = getFirstDay(input);
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
    .slice(0, getWeekDay(firstDay))
    .reverse();

  const days = previousMonthDays.concat(getDaysMonth(lastDay));

  let snippet = `<h2>${months[input.month]} ${
    input.year
  }</h2><br/><table><tbody><head><tr><th>${weekDays[weekStart][0]}</th><th>${
    weekDays[weekStart][1]
  }</th><th>${weekDays[weekStart][2]}</th><th>${
    weekDays[weekStart][3]
  }</th><th>${weekDays[weekStart][4]}</th><th>${
    weekDays[weekStart][5]
  }</th><th>${weekDays[weekStart][6]}</th>`;

  days.forEach((date, index) => {
    if (index % 7 === 0) {
      snippet += `<tr>`;
    }
    snippet += `<td class="${
      date.previous ? "previous" : ""
    }">${date.getDate().toString()}`;
    if (index % 7 === 6 || index === days.length) {
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

function getWeekDay(date) {
  const number = date.getDay();
  if (weekStart === "s") {
    return number;
  }
  if (number === 0) {
    return 6;
  }
  return number - 1;
}

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
