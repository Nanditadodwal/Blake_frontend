/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import "./HomeInputPage.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const HomeInputPage = () => {
  let { wordOfDay, user } = useContext(AuthContext);
  const d = new Date();
  var day = d.toLocaleString("en-CA", { day: "2-digit" });
  var month = d.toLocaleString("en-CA", { month: "2-digit" });
  var year = d.toLocaleString("en-CA", { year: "numeric" });

  const today_date = year + "-" + month + "-" + day;

  const [inputArr, setInputArr] = useState([]);
  const [inputWord, setInputWord] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    setInputWord("");
    wordInput();
    setInputArr([]);
  }
  function changInput(e) {
    e.preventDefault();
    setInputArr([...inputArr, { inputWord }]);
    setInputWord("");
  }
  function removeHandler(e) {
    e.preventDefault();
    let req_index = e.target.getAttribute("data-index");
    console.log(req_index);
    let new_arr = inputArr;
    console.log(new_arr);
    inputArr.splice(req_index, 1);
    console.log("new_arr = ", new_arr);
    setInputArr(new_arr);
  }

  let wordInput = async (e) => {
    // e.preventDefault()
    for (let word in inputArr) {
      if (inputArr[word].inputWord === "") {
        continue;
      }
      let item = { user: user.username, word: inputArr[word].inputWord };
      // console.log(authTokens.access)
      // let accessToken = authTokens.access
      let response = await fetch("http://127.0.0.1:8000/api/home-input", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        console.log("The word has been submitted");
      } else {
        console.log("something went wrong");
      }
    }
    alert("all the words have been submitted!")
  };
  console.log(inputArr);
  let reqWord = "";
  for (let value of wordOfDay) {
    if (value["date"] === today_date) {
      reqWord = value["Word_of_the_day"];
    }
  }

  return (
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>
      <div className="Home-WOTD">
        Today's Word Of The Day is:
        <div className="WOTD">{reqWord}</div>
      </div>
      <div className="rhyming-words">
        Enter Some Rhyming Words
        <div className="input-word">
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="A Rhyming Word"
              className="rhymingWord"
            >
              <Form.Control
                type="text"
                placeholder="Rhyming Word"
                name="inputWord"
                className="rhymingWord"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
              />
            </FloatingLabel>
            <button className="addmore-button-rhyme" onClick={changInput}>
              Add More
            </button>
            <div className="input-table">
              <div className="input-array">
                {inputArr.map((value, index) => {
                  return (
                    <div key={index}>
                      <span className="before-submission container">
                        {value.inputWord}&nbsp;
                        <button
                          className="remove-button"
                          data-index={index}
                          onClick={removeHandler}
                        >
                          X
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <br />
            {inputWord || inputArr ? (
              <button
                className="submit-button-rhyme"
                type="submit"
                onClick={submitHandler}
              >
                Submit
              </button>
            ) : (
              ""
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HomeInputPage;
