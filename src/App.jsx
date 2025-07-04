import "./App.css";
import { MainLayout } from "./components/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<div>Main</div>} />
          <Route path="/addquestion" element={<div>AddQuestion</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/questions/:id" element={<div>qwe</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
