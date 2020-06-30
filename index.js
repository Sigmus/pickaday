import range from "lodash/range";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";

import "./index.css";
dayjs.extend(weekday);
dayjs.extend(utc);

const [el] = document.getElementsByClassName("ptd");

function renderDays(year, month) {
  const lastDay = new Date(year, month + 1, 0);

  const days = range(lastDay.getDay() - 1)
    .map((i) => "x")
    .concat(range(1, lastDay.getDate() + 1));

  console.log(days);

  el.innerHTML = lastDay;
}

// console.log(dayjs().set("month", 2));

// renderDays(2020, 0);
renderDays(2020, 1);
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
