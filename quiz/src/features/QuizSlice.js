import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberOfQuestions: 5,
  category: "football",
  timePerQuestion: 10,
  selectedAnswer: "",
  success: false,
  correctAnswers: 0,
};

export const QuizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setNumberOfQuestions: (state, action) => {
      state.numberOfQuestions = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setTimePerQuestion: (state, action) => {
      state.timePerQuestion = action.payload;
    },
    setSelectedAnswer: (state, action) => {
      state.selectedAnswer = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setCorrectAnswers: (state) => {
      state.correctAnswers++;
    },
  },
});

export const {
  setNumberOfQuestions,
  setCategory,
  setDifficulty,
  setTimePerQuestion,
  setSelectedAnswer,
  setSuccess,
  setCorrectAnswers,
} = QuizSlice.actions;

export default QuizSlice.reducer;
