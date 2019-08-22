import React from "react";

function Revenue(props) {
  let revenue = "";
  let revenueCSS = "";
  let extras = {};
  extras.revenue = 0;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (props.extrasArr.length !== 0) {
    extras = props.extrasArr[0];
  }
  if (extras.revenue !== 0) {
    revenue = numberWithCommas(extras.revenue);
    revenue = "Revenue: $" + revenue;
    revenueCSS = "pl-3  mt-3";
  }
  return <p className={revenueCSS}>{revenue}</p>;
}

export default Revenue;
