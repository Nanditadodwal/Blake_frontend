import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: "",
  userInfo: "",
  authTokens: "",
  words: "",
  wordOfDay: "",
  searchWords: "",
  loginUser: () => {},
  logoutUser: () => {},
  // wordInput: () => {},
  wordOfTheDayGet: () => {},
  wordOfTheDayPost: () => {},
  acceptOrRejectGet: () => {},
  // acceptOrRejectPost: () => {},
});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // The user and the token values will change on the first login only.----

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("auth-tokens")
      ? JSON.parse(localStorage.getItem("auth-tokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("auth-tokens")
      ? jwt_decode(localStorage.getItem("auth-tokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // LOGIN FUNCTION -------------------------------------------

  let loginUser = async (e) => {
    e.preventDefault();
    let item = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(item);
    let response = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    let data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log(response);
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("auth-tokens", JSON.stringify(data));
      navigate("/home");
    } else {
      alert("your credentials are wrong");
    }
  };
  let [userInfo, setUserInfo] = useState([]);

  let loginUserGet = async (e) => {
    console.log("Login Get------------------------");
    let response = await fetch("http://127.0.0.1:8000/api/auth/login");
    setUserInfo(await response.json());
    console.log(userInfo);
  };

  useEffect(() => {
    loginUserGet();
  }, []);

  // //WORD INPUT FUNCTION-----------------------------------------

  // let wordInput = async (e) => {
  //   e.preventDefault();
  //   console.log("word input-----------------");
  //   let item = { user: user.username, word: e.target.inputWord.value };
  //   // console.log(authTokens.access)
  //   // let accessToken = authTokens.access
  //   let response = await fetch("http://127.0.0.1:8000/api/home-input", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       // Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify(item),
  //   });
  //   if (response.ok) {
  //     console.log("The word has been submitted");
  //   } else {
  //     console.log("something went wrong");
  //   }
  //   e.target.
  // };

  //ACCEPT OR REJECT FUNCTION----------------------------------

  const [words, setWords] = useState([]);

  let acceptOrRejectGet = async (e) => {
    console.log("Accept or Reject Get------------------------");
    let response = await fetch("http://127.0.0.1:8000/api/accept-or-reject");
    setWords(await response.json());
    console.log();
  };

  useEffect(() => {
    acceptOrRejectGet();
  }, []);

  // let acceptOrRejectPost = async (e) => {
  //   e.preventDefault();
  //   console.log("Accept or Reject Post -----------------");
  //   let item = { word: "word", is_accepted: true };
  //   let response = await fetch("http://127.0.0.1:8000/api/accept-or-reject", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(item),
  //   });
  //   console.log(response);
  //   if (response.ok) {
  //     console.log("The words has been submitted");
  //   } else {
  //     console.log("something went wrong");
  //   }
  // };

  //WORD OF THE DAY FUNCTION------------------------------------

  const [wordOfDay, setWordOfDay] = useState([]);

  let wordOfTheDayGet = async (e) => {
    console.log("Word of the day Get------------------------");
    let response = await fetch("http://127.0.0.1:8000/api/word-of-the-day");
    // let wordOfDay = await response.json()
    // console.log(wordOfDay);
    setWordOfDay(await response.json());
  };

  useEffect(() => {
    wordOfTheDayGet();
  }, []);

  let wordOfTheDayPost = async (e) => {
    e.preventDefault();
    console.log("word of the day input-----------------");
    let item = { Word_of_the_day: e.target.wordOfTheDay.value };
    let response = await fetch("http://127.0.0.1:8000/api/word-of-the-day", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      console.log("Word of the day has been submitted");
    } else {
      console.log("something went wrong");
    }
    e.target.wordOfTheDay.value = "";
  };

  //SEARCH FUNCTION---------------------------------------------
  let [searchWords, setSearchWords] = useState([]);

  let searchGet = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/search-rhyming-words"
    );
    // let wordOfDay = await response.json()
    // console.log(wordOfDay);
    let result = await response.json();
    if (response.ok) {
      setSearchWords(result);
    }
  };

  useEffect(() => {
    searchGet();
  }, []);

  //LOGOUT FUNCTION---------------------------------------------

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("auth-tokens");
    navigate("/");
  };

  //TOKEN UPDATION-----------------------------------------------

  let updateToken = async () => {
    console.log("update token called---------------");
    let response = await fetch("http://127.0.0.1:8000/api/auth/login-refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });
    let data = await response.json();

    if (response.ok) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("auth-tokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  let contextData = {
    user: user,
    userInfo: userInfo,
    authTokens: authTokens,
    words: words,
    wordOfDay: wordOfDay,
    searchWords: searchWords,
    loginUser: loginUser,
    logoutUser: logoutUser,
    // wordInput: wordInput,
    wordOfTheDayGet: wordOfTheDayGet,
    wordOfTheDayPost: wordOfTheDayPost,
    acceptOrRejectGet: acceptOrRejectGet,
    // acceptOrRejectPost: acceptOrRejectPost,
  };

  useEffect(() => {
    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
