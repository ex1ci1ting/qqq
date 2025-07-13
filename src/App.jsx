import "./App.css";
import { MainLayout } from "./components/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { QuestionPage } from "./Pages/QuestionPage";
import { AddQuestionPageLazy } from "./Pages/AddQuestionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<div>Main</div>} />
          <Route path="/addquestion" element={<AddQuestionPageLazy />} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
