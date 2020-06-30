import "./index.css";

const [el] = document.getElementsByClassName("ptd");

function renderDays(month) {
  el.innerHTML = month;
}

renderDays(5);
