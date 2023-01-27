import React from "react";
import img from "../../images/Mr.B.png";
import { FloatingLabel, Form } from "react-bootstrap";
import "./Search.css"

const Search = () => {
  return (
    <div>
      <div className="image">
        <img className="logo" src={img} alt="Mr. B" />
      </div>
      <div className="search">
        Search here for some rhyming words
      </div>
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
              name="inputWord"
              className="rhymingWord"
            //   value="searchWord"
              //   onChange={e.target.value}
            />
          </FloatingLabel>
          <button className="submit-button-search">Add More</button>
        </Form>
      </div>
    </div>
  );
};

export default Search;
