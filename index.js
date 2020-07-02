import "./index.css";
import pickAday from "./pickADay";

pickAday({
  weekStart: "m",
  mountEl: document.getElementsByClassName("ptd-example")[0],
  disablePast: true,
  // selected: "2020-08-03",
});
