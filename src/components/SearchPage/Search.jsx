import React from "react";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import "./Search.css";
import { useState } from "react";

const Search = () => {
  let [searchWord, setSearchWord] = useState("");
  let [searchArr, setSearchArr] = useState([]);
  const [searchWordOfTheDay, setsearchWordOfTheDay] = useState("");
  const [flag, setflag] = useState(false);

  let searchGet = async (e) => {
    e.preventDefault();
    setflag(true);
    console.log(searchWord);
    let response = await fetch(
      "http://127.0.0.1:8000/api/search-rhyming-words"
    );
    let result = await response.json();
    if (response.ok) {
      setSearchArr(result);
      console.log(searchWord);
      for (let i of searchArr) {
        let reqWord = searchWord.toLowerCase();
        let wordOfTheDayInList = i.Word_of_the_day.toLowerCase();
        let wordInList = i.word.toLowerCase();
        if (reqWord === wordOfTheDayInList || reqWord === wordInList) {
          setsearchWordOfTheDay(wordOfTheDayInList);
          console.log(searchWordOfTheDay);
          break;
        }
      }
    }
  };

  return (
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>
      <div className="search">Search here for some rhyming words</div>
      <div className="search-word">
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Search Rhyming words"
            className="searchWord"
          >
            <Form.Control
              type="text"
              placeholder="Rhyming Word"
              name="searchWord"
              className="rhymingWord"
              //   value="searchWord"
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </FloatingLabel>
          <button className="submit-button-search" onClick={searchGet}>
            Search
          </button>
        </Form>
        {flag ? (
          <div>
            {searchArr.map((curElem) => {
              console.log(curElem);

              return (
                <div key={curElem.id}>
                  {console.log(curElem.Word_of_the_day.toLowerCase())}
                  {console.log(searchWordOfTheDay)}
                  {curElem.Word_of_the_day.toLowerCase() ===
                  searchWordOfTheDay ? (
                    <span>{curElem.word}</span>
                  ) : (
                    "No rhyming words found!"
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
