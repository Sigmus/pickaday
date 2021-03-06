import "./index.css";
import chevronLeft from "./imgs/bx-chevron-left.svg";
import chevronRight from "./imgs/bx-chevron-right.svg";

export default function pickADay({
  weekStart,
  mountEl,
  year,
  month,
  selected,
  disablePast,
  weekDays = {
    m: ["M", "T", "W", "T", "F", "S", "S"],
    s: ["S", "M", "T", "W", "T", "F", "S"],
  },
  months = [
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
  ],
}) {
  const today = new Date();

  const todayDataKey = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  if (typeof year === "undefined" || typeof month === "undefined") {
    year = today.getFullYear();
    month = today.getMonth();
  }

  render({ year, month, selected });

  function render(input) {
    month = input.month;
    year = input.year;

    const newNode = document.createElement("div");
    newNode.className = "ptd-instance";
    newNode.innerHTML = `${
      renderHeader(input) + renderRows(input)
    }</tbody></table>`;

    mountEl.appendChild(newNode);
    bindEvents();
  }

  function renderHeader(input) {
    return `<div class="ptd-header"><div class="ptd-go-previous ${
      shouldDisablePast() ? "ptd-disabled" : ""
    }" src="${chevronLeft}"/><img src="${chevronLeft}"/></div><div class="ptd-header-title">${
      months[input.month]
    } ${
      input.year
    }</div><img class="ptd-go-next" src="${chevronRight}"/></div><table><tbody><head><tr><th>${
      weekDays[weekStart][0]
    }</th><th>${weekDays[weekStart][1]}</th><th>${
      weekDays[weekStart][2]
    }</th><th>${weekDays[weekStart][3]}</th><th>${
      weekDays[weekStart][4]
    }</th><th>${weekDays[weekStart][5]}</th><th>${weekDays[weekStart][6]}</th>`;
  }

  function shouldDisablePast() {
    return (
      disablePast && today.getMonth() === month && today.getFullYear() === year
    );
  }

  function renderRows(input) {
    let snippet = "";

    const days = getPreviousMonthDays(input).concat(
      getDaysMonth(getLastDay(input))
    );

    days.forEach((date, index) => {
      const dataKey = `${input.year}-${(input.month + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      if (index % 7 === 0) {
        snippet += `<tr>`;
      }

      snippet += `<td data-key="${date.previous ? "" : dataKey}" class="${
        date.previous ? "ptd-previous " : ""
      }${dataKey === todayDataKey ? "ptd-today " : ""}${
        input.selected && input.selected === dataKey ? "ptd-selected" : ""
      }">${date.getDate().toString()}`;

      if (index % 7 === 6 || index === days.length) {
        snippet += `</tr>`;
      }
    });

    return snippet;
  }

  function getPreviousMonthDays(input) {
    return getDaysMonth(getLastDay(sub1Month(input)))
      .map((i) => {
        i.previous = true;
        return i;
      })
      .reverse()
      .slice(0, getWeekDay(getFirstDay(input)))
      .reverse();
  }

  function getDaysMonth(date) {
    return Array.from(Array(date.getDate()), (_, i) => i + 1).map((i) => {
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

  function sub1Month(input) {
    return {
      year: input.month === 0 ? input.year - 1 : input.year,
      month: input.month === 0 ? 11 : input.month - 1,
    };
  }

  function add1Month(input) {
    return {
      year: input.month === 11 ? input.year + 1 : input.year,
      month: input.month === 11 ? 0 : input.month + 1,
    };
  }

  function getAllDataKeys() {
    return document.querySelectorAll("[data-key]");
  }

  function bindEvents() {
    getAllDataKeys().forEach((el) => {
      el.addEventListener("click", function (ev) {
        const el = ev.currentTarget;
        if (
          el.classList.contains("ptd-selected") ||
          el.classList.contains("ptd-previous")
        ) {
          return;
        }

        getAllDataKeys().forEach((el) => {
          el.classList.remove("ptd-selected");
        });

        el.classList.add("ptd-selected");
        selected = el.dataset.key;
      });
    });

    document
      .getElementsByClassName("ptd-go-previous")[0]
      .addEventListener("click", function (ev) {
        if (ev.currentTarget.classList.contains("ptd-disabled")) {
          return;
        }
        document.getElementsByClassName("ptd-instance")[0].remove();
        render({ ...sub1Month({ month, year }), selected });
      });

    document
      .getElementsByClassName("ptd-go-next")[0]
      .addEventListener("click", function () {
        document.getElementsByClassName("ptd-instance")[0].remove();
        render({ ...add1Month({ month, year }), selected });
      });
  }
}
