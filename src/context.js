import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [isModelOpen, setIsModelOpen] = useState(false);

  async function fetchQuestions(url) {
    setLoading(true);
    setWaiting(false);
    const res = await axios(url).catch((err) => console.log(err));
    if (res) {
      const data = res.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  }

  function nextQuestion() {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModel();
        return 0;
      } else {
        return index;
      }
    });
  }

  function checkAnswer(value) {
    if (value) {
      setCorrect((prev) => prev + 1);
    }
    nextQuestion();
  }

  function openModel() {
    setIsModelOpen(true);
  }
  function closeModel() {
    setWaiting(true);
    setCorrect(0);
    setIsModelOpen(false);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const {amount, category,difficulty} = quiz
const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
fetchQuestions(url)
  }
  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  // }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        error,
        correct,
        isModelOpen,
        quiz,
        handleChange,
        handleSubmit,
        nextQuestion,
        checkAnswer,
        closeModel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
