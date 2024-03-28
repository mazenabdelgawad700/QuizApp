import "./Home.css";
import options from "../../../data/options.json";
import SelectBox from "../../components/SelectBox/SelectBox";
import {
  setNumberOfQuestions,
  setCategory,
  setTimePerQuestion,
} from "../../features/QuizSlice";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { numberOfQuestions, category, timePerQuestion } = useSelector(
    (state) => state.quiz
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <p className="fs-2 fw-bold text-danger">
          Solve all questions correctly to win
        </p>
      )}
      <div className="homeForm rounded bg-primary m-auto p-3">
        <h1 className="text-center mb-3">Quiz App</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="d-flex flex-column
				justify-content-around gap-3"
        >
          <SelectBox
            label="Number Of Questions"
            id="numberOfQuestion"
            options={options.numberOfQuestions}
            value={numberOfQuestions}
            disptachFunction={setNumberOfQuestions}
          />
          <SelectBox
            label="Select Category"
            id="categories"
            options={options.categories}
            value={category}
            disptachFunction={setCategory}
          />
          <SelectBox
            label="Select Time Per Questions"
            id="timePerQuestion"
            options={options.timePerQuestion}
            value={timePerQuestion}
            disptachFunction={setTimePerQuestion}
          />
          <NavLink
            className="start btn m-auto px-3"
            to="/quiz"
            style={{ border: "1px solid #eee" }}
          >
            Start Quiz
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Home;
