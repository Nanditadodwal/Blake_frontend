import React, { useState } from "react";
import "./AdminPage.css";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  let { wordOfTheDayPost } = useContext(AuthContext);
  const notify = () => toast("Word of the day has been set!");
  // const [WordOfTheDay, setWordOfTheDay] = useState("");
  // async function WordOfTheDayFunc(e) {
  //   e.preventDefault();
  //   console.log(WordOfTheDay);
  //   let item = { Word_of_the_day: WordOfTheDay };
  //   let accessToken = JSON.parse(localStorage.getItem("user-info"))["access"];
  //   console.log(accessToken);
  //   let response = await fetch("http://127.0.0.1:8000/api/word-of-the-day", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify(item),
  //   });
  //   console.log(item);
  //   if (response.ok) {
  //     alert("Word of  the day has been submitted!");
  //   } else {
  //     alert("Something went wrong!");
  //   }
  // }
  return (
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>
      <div className="container">
        <div className="Word-of-the-day">
          Enter Today's Word Of The Day:
          <div className="input-word">
            <Form onSubmit={wordOfTheDayPost}>
              <FloatingLabel
                controlId="floatingInput"
                label="Word of the day"
                className="wordoftheday"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter a word for the day"
                  className="wordoftheday"
                  name="wordOfTheDay"
                  // onChange={(e) => setWordOfTheDay(e.target.value)}
                />
              </FloatingLabel>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
