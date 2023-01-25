import React, { useState } from "react";
import "./add_expense_style.css";
import noImageSelected from "../../Assets/no-image.png";

const AddExpenses = () => {
  const [imgSelected, setImgSelected] = useState({
    imgData: {},
    isSelected: false,
  });
  const [emailSets, setEmailSet] = useState([]);

  const imageHandler = (e) => {
    const imgFile = e.target.files[0];
    setImgSelected({ imgData: URL.createObjectURL(imgFile), isSelected: true });
  };

  const emailHandler = (e) => {
    const emailRegex = /[\w]@[a-z][.]com/;
    const emailString = e.target.value;
    if (emailRegex.test(emailString))
    {
      alert("You can proced");
    }
    else 
    {
      alert("You can not proced");      
    }
  };

  return (
    <div className="flex-column">
      <div className="add-expense-container flex">
        <form className="ae-form flex-column">
          <div className="ae-email-container flex">
            <label htmlFor="email">with your and: </label>
            <div className="ae-email-sections flex-column">
              {/*In this place, will place render those people that i have entered*/}
              {emailSets.length !== 0 ? <h1>sameer</h1> : null}
              <input
                className="ae-email l-input"
                placeholder="enter eamils"
                name="email"
                type="email"
                id="email"
                onKeyPress={emailHandler}
              />
            </div>
          </div>
          <input
            className="l-input ae-input"
            placeholder="Descriptioin"
            type="text"
            name="description"
            id="description"
          />
          <input
            className="l-input ae-input"
            type="number"
            placeholder="$0.00"
            name="price"
            id="price"
          />
          <input className="l-input ae-input" type="date" name="date" />
          <input
            className="l-input ae-input"
            type="file"
            accept=".jpg,.jpeg,.peg"
            onChange={imageHandler}
          />
        </form>
        <div className="ae-img-container flex-column">
          {imgSelected.isSelected ? (
            <img className="ae-img" src={imgSelected.imgData} alt="No-File" />
          ) : (
            <img src={noImageSelected} alt="No-image" />
          )}
        </div>
      </div>
      <div className="ae-btn-container">
        <button className="l-btn ae-btn">Add</button>
      </div>
    </div>
  );
};

export default AddExpenses;
