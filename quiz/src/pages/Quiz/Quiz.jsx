import Answer from "./Answer";
import "./Quiz.css";
import { useSelector, useDispatch } from "react-redux";
import questions from "../../../data/questions.json";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSuccess, setCorrectAnswers } from "../../features/QuizSlice";
let inputs = [];

const Quiz = () => {
  const {
    numberOfQuestions,
    category,
    timePerQuestion,
    selectedAnswer,
    correctAnswers,
  } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  const [time, setTime] = useState(timePerQuestion);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);


  const submitAnswer = useRef();
  const navigate = useNavigate();
  const question = questions[category][currentQuestion];

  const answers = () => (
    <>
      <Answer id={question.id} answer={question.answer_1} />
      <Answer id={question.id} answer={question.answer_2} />
      <Answer id={question.id} answer={question.answer_3} />
      <Answer id={question.id} answer={question.answer_4} />
    </>
  );

  useEffect(() => {
    inputs = Array.from(document.querySelectorAll("input[type='radio']"));
  }, []);

  // Start Handel Timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    intervalRef.current = intervalId;
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (time <= 0 && currentQuestionNumber < numberOfQuestions) {
      // if the user choose an answer but does not click submit button, check the coorect answer

      setCurrentQuestion((prev) => (prev += 1));
      setCurrentQuestionNumber((prev) => (prev += 1));
      inputs.forEach((input) => (input.checked = false));
      setTime(timePerQuestion);
    } else if (time <= 0 && currentQuestionNumber <= numberOfQuestions) {
      if (correctAnswers === +numberOfQuestions) {
        navigate("/result");
        dispatch(setSuccess(true));
        submitAnswer.current.disabled = true;
      } else {
        navigate("/result");
        dispatch(setSuccess(false));
        submitAnswer.current.disabled = true;
      }
      clearInterval(intervalRef.current);
    }
  }, [
    time,
    currentQuestion,
    numberOfQuestions,
    timePerQuestion,
    correctAnswers,
    dispatch,
    navigate,
    currentQuestionNumber,
  ]);
  // End Handel Timer

  const handleSubmitAnswer = () => {
    setTime(timePerQuestion);
    if (currentQuestionNumber <= numberOfQuestions) {
      let checkedInputs = inputs.map((input) => input.checked);

      if (checkedInputs.includes(true)) {
        if (selectedAnswer === question.right_answer) {
          console.log("correctAnswers before updating", correctAnswers);
          dispatch(setCorrectAnswers()); // will not work
        }
        console.log("correctAnswers after updating", correctAnswers);
        if (currentQuestionNumber === +numberOfQuestions) {
          navigate("/result");
          if (correctAnswers === +numberOfQuestions) {
            dispatch(setSuccess(true));
            submitAnswer.current.disabled = true;
          } else {
            dispatch(setSuccess(false));
            submitAnswer.current.disabled = true;
          }
        } else {
          setCurrentQuestion((prev) => (prev += 1));
          setCurrentQuestionNumber((prev) => (prev += 1));
        }

        inputs.forEach((input) => (input.checked = false));
      } else {
        return;
      }
    }
  };

  return (
    <div className="quiz bg-primary rounded p-4">
      <div
        className="timer text-center d-flex align-items-center justify-content-center m-auto 
      position-relative"
      >
        <span className="fw-bold fs-4">{time}</span>
      </div>

      <div className="question-number text-white-50">
        Question{" "}
        <span className="currentQuestion">{currentQuestionNumber}</span>/
        <span className="totalQuestions">{numberOfQuestions}</span>
      </div>

      <p className="question-text">{question.question}</p>

      <form className="d-flex flex-column gap-3">
        {answers()}
        <button
          ref={submitAnswer}
          className="start btn m-auto px-3 text-light"
          style={{ border: "1px solid #eee" }}
          type="button"
          onClick={handleSubmitAnswer}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Quiz;
