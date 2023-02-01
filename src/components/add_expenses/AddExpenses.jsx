import React, { useState, useRef, useEffect } from "react";
import noImageSelected from "../../Assets/no-image.png";
import { ref, onValue } from "firebase/database";
import { dataBase } from "../../firebase-config";
import Message from "../message/Message";
import "./add_expense_style.css";
import TablePayedOrder from "../table/TablePayedOrder";

//Finding Emails.
const findingEmailHandler = (element, email) => {
  if (element === email) {
    return email;
  }
};

const AddExpenses = () => {
  //States
  const [imgSelected, setImgSelected] = useState({
    imgData: {},
    isSelected: false,
  });
  const [allEmail, setAllEmail] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [valid, setValid] = useState({
    isValid: true,
    message: "",
    type: "",
  });
  const [tableData, setTableData] = useState(false);

  //useRef
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);

  //Handeling images
  const imageHandler = (e) => {
    const imgFile = e.target.files[0];
    setImgSelected({ imgData: URL.createObjectURL(imgFile), isSelected: true });
  };

  //UseEffect
  useEffect(() => {
    const emailFethcer = () => {
      const work = ref(dataBase, "/");
      onValue(work, (snap) => {
        setAllEmail([...snap.val().email]);
      });
    };
    emailFethcer();
  }, []);

  //Handeling Add button
  const addExpenseHandler = () => {
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const date = dateRef.current.value;

    //Validating
    if (dataSets.length === 0) {
      setValid({
        isValid: false,
        message:
          "Please don't left email empty, and enter friends email not your own.",
        type: "Error",
      });
    } else if (description.trim().length < 25 || description.trim() === "") {
      setValid({
        isValid: false,
        message:
          "The description must contain 25 or more letters and don't left description emplty.",
        type: "Error",
      });
    } else if (price <= 0) {
      setValid({
        isValid: false,
        message: "The total price must be positive number and not be zero.",
        type: "Error",
      });
    } else if (date === "") {
      setValid({
        isValid: false,
        message: "The date is not entered",
        type: "Error",
      });
    } else if (imgSelected.isSelected === false) {
      setValid({
        isValid: false,
        message: "The recite image is not selected.",
        type: "Error",
      });
    } else {
      //Inserting data
      setTableData({ isTable: true, data: [] });
    }
  };

  //Handeling email.
  const emailHandler = (e) => {
    if (e.key === "Enter") {
      const emailRegex = /[\w]*@[a-z]*[.]com/g;
      const emailString = e.target.value;
      let checker = true;
      if (emailRegex.test(emailString)) {
        //Finding the Email
        const findedEmail = allEmail.find((element) =>
          findingEmailHandler(element, emailString)
        );

        //Finding the repeating element
        const repeatedElement = dataSets.find((element) => {
          if (element.email === emailString) {
            return element;
          }
        });

        //Validating the email, whather it exists or repeated or not,.
        if (findedEmail && repeatedElement === undefined) {
          checker = false;
          setDataSets((prev) => [
            ...prev,
            {
              id: dataSets.length + 1,
              email: emailString,
              payed: 0,
              order: 0,
              pending: 0,
            },
          ]);
        }
      }

      if (checker) {
        setValid({
          isValid: false,
          message: "This email does not exist, please enter correct email.",
          type: "Error",
        });
      }
    }
  };

  return (
    <>
      {!valid.isValid || tableData.isTable ? (
        <div className="background"></div>
      ) : null}
      {tableData ? (
        <TablePayedOrder
          dataSets={dataSets}
          setDataSets={setDataSets}
          setTableData={setTableData}
          totalPrice={priceRef.current.value}
          setValid={setValid}
          descriptiveInfo={{
            description: descriptionRef.current.value,
            totalPrice: priceRef.current.value,
            date: dateRef.current.value,
          }}
        />
      ) : null}
      {!valid.isValid ? <Message valid={valid} setValid={setValid} /> : null}
      <div className="flex-column">
        <div className="add-expense-container flex">
          <form className="ae-form flex-column">
            <div className="ae-email-container flex">
              <label htmlFor="email">with your and: </label>
              <div className="ae-email-sections flex-column">
                {/*In this place, will place render those people that i have entered*/}
                {dataSets.length !== 0
                  ? dataSets.map((element) => (
                      <p className="ae-enterd-email" key={element.id}>
                        {element.email}
                      </p>
                    ))
                  : null}
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
              ref={descriptionRef}
            />
            <input
              className="l-input ae-input"
              type="number"
              placeholder="$0.00"
              name="price"
              id="price"
              ref={priceRef}
            />
            <input
              className="l-input ae-input"
              ref={dateRef}
              type="date"
              name="date"
            />
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
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img src={noImageSelected} alt="No-image" />
            )}
          </div>
        </div>
        <div className="ae-btn-container">
          <button className="l-btn h-btn ae-btn" onClick={addExpenseHandler}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpenses;
