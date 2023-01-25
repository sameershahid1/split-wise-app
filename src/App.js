import React from "react";
import Login from "./pages/login/login";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/page_Not_Found/NotFound";
import DaskBoard from "./pages/dask_board/DaskBoard.jsx";
import AddExpenses from "./components/add_expenses/AddExpenses.jsx";
import AllExpenses from "./components/all_expenses/AllExpenses.jsx";
import { Outlet } from "react-router-dom";
import "./app.css";

const Method = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Method />}>
          <Route path="/" element={<Login />}></Route>
        </Route>
        <Route path="/dash-board" element={<DaskBoard />}>
          <Route path="add-expense" element={<AddExpenses />}></Route>
          <Route path="all-expense" element={<AllExpenses />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
