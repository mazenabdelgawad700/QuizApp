import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedAnswer } from "../../features/QuizSlice";
/* eslint-disable react/prop-types */
const Answer = ({ answer, id }) => {
  const dispatch = useDispatch();

  // handle choose the answer => to get ensure that user can only choose one answer
  useEffect(() => {
    const inputs = document.querySelectorAll("input[type='radio']");
    const arrayOfInputs = Array.from(inputs);
    arrayOfInputs.map((input) => {
      input.addEventListener("change", () => {
        arrayOfInputs.forEach((checkedInput) => {
          if (checkedInput !== input && checkedInput.checked) {
            checkedInput.checked = false;
          }
        });
      });
    });
  }, []);

  const handleRadioChange = (event) => {
    dispatch(setSelectedAnswer(event.target.value));
  };

  return (
    <>
      <label
        className="answer-container d-flex justify-content-between align-items-baseline rounded"
        htmlFor={`${id ? `${id}-` : ""}${answer.toLowerCase()}`}
      >
        {answer}
        <input
          type="radio"
          value={answer}
          name="group1"
          id={`${id ? `${id}-` : ""}${answer.toLowerCase()}`}
          onChange={handleRadioChange}
        />
      </label>
    </>
  );
};

export default Answer;
