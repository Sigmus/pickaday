import range from "lodash/range";
import "./index.css";
import chevronLeft from "./imgs/bx-chevron-left.svg";
import chevronRight from "./imgs/bx-chevron-right.svg";

export default function pickADay({
  weekStart,
  mountEl,
  year,
  month,
  selected,
}) {
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

  render({ year, month, selected });

  function render(input) {
    month = input.month;
    year = input.year;
    let snippet = renderHeader(input);

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
        date.previous ? "previous " : ""
      }${
        input.selected && input.selected === dataKey ? "selected" : ""
      }">${date.getDate().toString()}`;

      if (index % 7 === 6 || index === days.length) {
        snippet += `</tr>`;
      }
    });

    let newNode = document.createElement("div");
    newNode.className = "ptd-instance";
    newNode.innerHTML = `${snippet}</tbody></table>`;
    mountEl.appendChild(newNode);

    bindEvents();
  }

  function renderHeader(input) {
    return `<div class="header"><img class="go-previous" src="${chevronLeft}"/><h2>${
      months[input.month]
    } ${
      input.year
    }</h2><img class="go-next" src="${chevronRight}"/></div><table><tbody><head><tr><th>${
      weekDays[weekStart][0]
    }</th><th>${weekDays[weekStart][1]}</th><th>${
      weekDays[weekStart][2]
    }</th><th>${weekDays[weekStart][3]}</th><th>${
      weekDays[weekStart][4]
    }</th><th>${weekDays[weekStart][5]}</th><th>${weekDays[weekStart][6]}</th>`;
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

  function getAllDataKeys() {
    return document.querySelectorAll("[data-key]");
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

  function bindEvents() {
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

        this.classList.add("selected");
        selected = this.dataset.key;
      });
    });

    document
      .getElementsByClassName("go-previous")[0]
      .addEventListener("click", function (ev) {
        document.getElementsByClassName("ptd-instance")[0].remove();
        render({ ...sub1Month({ month, year }), selected });
      });

    document
      .getElementsByClassName("go-next")[0]
      .addEventListener("click", function (ev) {
        document.getElementsByClassName("ptd-instance")[0].remove();
        render({ ...add1Month({ month, year }), selected });
      });
  }
}
