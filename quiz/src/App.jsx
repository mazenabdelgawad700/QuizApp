import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";
const App = () => {
  return (
    <main>
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
