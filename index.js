import "./index.css";
import pickAday from "./pickaday";

pickAday({
  weekStart: "m",
  mountEl: document.getElementsByClassName("ptd")[0],
  year: 2020,
  month: 0,
  selected: "2020-01-09",
});
