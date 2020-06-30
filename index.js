import range from "lodash/range";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

import "./index.css";
dayjs.extend(weekday);

const [el] = document.getElementsByClassName("ptd");

function renderDays(month) {
  const lastDay = dayjs().set("month", month);
  const weekDay = lastDay.weekday();
  console.log(lastDay, weekDay);
  console.log(weekDay - 1);
  console.log(range(weekDay - 1));
  const days = range(weekDay - 1)
    .map((i) => "x")
    .concat(range(1, parseInt(lastDay.format("D")) + 1));
  console.log(days);

  el.innerHTML = lastDay;
}

// console.log(dayjs().set("month", 2));

renderDays(1);
