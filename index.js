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

function renderCalendar(input) {
  let snippet = renderHeader(input);

  const previousMonthDays = getPreviousMonthDays(input);
  const days = previousMonthDays.concat(getDaysMonth(getLastDay(input)));

  days.forEach((date, index) => {
    const dataKey = `${input.year}-${(input.month + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    if (index % 7 === 0) {
      snippet += `<tr>`;
    }

    snippet += `<td data-key="${date.previous ? "" : dataKey}" class="${
      date.previous ? "previous " : ""
    }${
      input.selected && input.selected === dataKey ? "selected" : ""
    }">${date.getDate().toString()}`;

    if (index % 7 === 6 || index === days.length) {
      snippet += `</tr>`;
    }
  });

  let newNode = document.createElement("div");
  newNode.innerHTML = `${snippet}</tbody></table>`;
  el.appendChild(newNode);
}

function renderHeader(input) {
  return `<div class="header"><h2>${months[input.month]} ${
    input.year
  }</h2></div><table><tbody><head><tr><th>${weekDays[weekStart][0]}</th><th>${
    weekDays[weekStart][1]
  }</th><th>${weekDays[weekStart][2]}</th><th>${
    weekDays[weekStart][3]
  }</th><th>${weekDays[weekStart][4]}</th><th>${
    weekDays[weekStart][5]
  }</th><th>${weekDays[weekStart][6]}</th>`;
}

function getPreviousMonthDays(input) {
  return getDaysMonth(
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
    .slice(0, getWeekDay(getFirstDay(input)))
    .reverse();
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

renderCalendar({ year: 2020, month: 0, selected: "2020-01-09" });
renderCalendar({ year: 2020, month: 1 });
renderCalendar({ year: 2020, month: 2 });
renderCalendar({ year: 2020, month: 3 });
renderCalendar({ year: 2020, month: 4 });
renderCalendar({ year: 2020, month: 5 });
renderCalendar({ year: 2020, month: 6 });
renderCalendar({ year: 2020, month: 7 });
renderCalendar({ year: 2020, month: 8 });
renderCalendar({ year: 2020, month: 9 });
renderCalendar({ year: 2020, month: 10 });
renderCalendar({ year: 2020, month: 11 });

getAllDataKeys().forEach((el) => {
  el.addEventListener("click", function (ev) {
    if (
      this.classList.contains("selected") ||
      this.classList.contains("previous")
    ) {
      return;
    }
    getAllDataKeys().forEach((el) => {
      el.classList.remove("selected");
    });
    // const date = this.dataset.key;
    this.classList.add("selected");
  });
});

function getAllDataKeys() {
  return document.querySelectorAll("[data-key]");
}
