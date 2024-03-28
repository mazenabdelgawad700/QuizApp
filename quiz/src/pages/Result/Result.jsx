import "./Result.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Result = () => {
  const { success, correctAnswers, numberOfQuestions } = useSelector(
    (state) => state.quiz
  );
  const navigate = useNavigate();

  const playAgain = () => {
    navigate("/");
    localStorage.clear();
  };
  return (
    <>
      {success ? (
        <section className="success bg-primary p-5 rounded text-center fs-1">
          <h2>Congratulations!🎉</h2>
          <p className="fs-4">You have completed the quiz.</p>
          <button
            className="btn text-light"
            style={{ border: "1px solid #eee" }}
            onClick={playAgain}
          >
            Play Again
          </button>
        </section>
      ) : (
        <section className="fail bg-danger p-5 rounded text-center fs-1">
          <h2>Game Over😂</h2>
          <p>Better luck next time!</p>
          <p className="fs-5">{`You have solved correctly ${correctAnswers} from ${numberOfQuestions}`}</p>
          <button
            className="btn text-light"
            style={{ border: "1px solid #eee" }}
            onClick={playAgain}
          >
            Play Again
          </button>
        </section>
      )}
    </>
  );
};

export default Result;
