import React, { useState } from "react";
import ExportToExcel from "../../helping_files/excel.js";
import "./table_pay_order_style.css";

const headerTagOrder = ["Email", "Payed", "Order"];
const headerTagReport = ["Email", "Payed", "Order", "Pending"];

//This is funtion handler header tags.
const headerTagHandler = (element, index) => {
  return (
    <th key={index} className="t-cell t-cell-down t-cell-right">
      {element}
    </th>
  );
};

const dataReportHandler = (element) => {
  return (
    <tr className="t-row" key={element.id}>
      <td className="t-cell t-cell-down t-cell-right">{element.email}</td>
      <td className="t-cell t-cell-down t-cell-right">{element.payed}</td>
      <td className="t-cell t-cell-down t-cell-right">{element.order}</td>
      <td className="t-cell t-cell-down t-cell-right">{element.pending}</td>
    </tr>
  );
};

const TablePayedOrder = ({
  setTableData,
  dataSets,
  setDataSets,
  totalPrice,
  setValid,
}) => {
  const [isGenerator, setIsGenerator] = useState(false);

  //Cancel Button Handler.
  const cancelHandler = () => {
    setTableData((prev) => !prev);
  };

  //Report Generator Handler
  const generatorHandler = () => {
    //verifiction for data entry.
    let totalOrder = 0;
    dataSets.forEach((element) => {
      totalOrder += element.order;
    });

    if (totalOrder === parseInt(totalPrice)) {
      setIsGenerator(true);
    } else {
      setValid({
        isValid: false,
        message: "The total order should be equal to total price.",
        type: "Error",
      });
    }
  };

  //Input Handler
  const inputHandler = (id, value, type) => {
    const data = dataSets.filter((element) => element.id !== id);
    const valueInt = parseInt(value);
    const temp = {
      id: id,
      email: dataSets[id - 1].email,
      payed: dataSets[id - 1].payed,
      order: dataSets[id - 1].order,
      pending: dataSets[id - 1].pending,
    };
    temp[type] = valueInt;
    temp.pending = temp.order - temp.payed;
    data.push(temp);
    data.sort((a, b) => a.id - b.id);
    setDataSets([...data]);
  };

  const dataTableHandler = (element) => {
    return (
      <tr className="t-row" key={element.id}>
        <td className="t-cell t-cell-down t-cell-right">{element.email}</td>
        <td className="t-cell t-cell-down t-cell-right">
          <input
            className="t-input"
            onChange={(e) => {
              inputHandler(element.id, e.target.value, "payed");
            }}
            type="number"
          />
        </td>
        <td className="t-cell t-cell-down t-cell-right">
          <input
            className="t-input"
            onChange={(e) => {
              inputHandler(element.id, e.target.value, "order");
            }}
            type="number"
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="table-pay-order-container">
      <div className="t-header-container flex-column">
        <h1 className="t-header">Table Pay & Order</h1>
        <p className="t-header-price">Total-Price: {totalPrice}</p>
      </div>
      <div className="container-overflow-scroll">
        <table className="table-container">
          <thead>
            <tr className="t-row">
              {isGenerator
                ? headerTagReport.map(headerTagHandler)
                : headerTagOrder.map(headerTagHandler)}
            </tr>
          </thead>
          <tbody>
            {isGenerator
              ? dataSets.map(dataReportHandler)
              : dataSets.map(dataTableHandler)}
            ;
          </tbody>
        </table>
      </div>
      <div className="t-btn-container flex">
        <button className="h-btn t-btn" type="button" onClick={cancelHandler}>
          Cancel
        </button>
        {isGenerator ? (
          <ExportToExcel className={"h-btn t-btn"} dataSet={dataSets} />
        ) : (
          <button
            className="h-btn t-btn"
            onClick={generatorHandler}
            type="button"
          >
            Generator
          </button>
        )}
      </div>
    </div>
  );
};

export default TablePayedOrder;
