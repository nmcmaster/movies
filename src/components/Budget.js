import React from "react";

function Budget(props) {
  let budget = "";
  let budgetCSS = "";
  let extras = {};
  extras.budget = 0;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (props.extrasArr.length !== 0) {
    extras = props.extrasArr[0];
  }
  if (extras.budget !== 0) {
    budget = numberWithCommas(extras.budget);
    budget = "Budget: $" + budget;
    budgetCSS = "pl-3";
  }
  return <p className={budgetCSS}>{budget}</p>;
}

export default Budget;
