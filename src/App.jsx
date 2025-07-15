import "./App.css";
import { MainLayout } from "./components/MainLayout";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { QuestionPage } from "./Pages/QuestionPage";
import { AddQuestionPageLazy } from "./Pages/AddQuestionPage";
import { EditQuestionPage } from "./Pages/EditQuestionPage";
import { AuthProvider } from "../Auth/AuthProvider";
import { UseAuth } from "../helpers/hooks/UseAuth";
import { ForbiddenPage } from "./Pages/ForbiddenPage";

const ProtectedRoutes = () => {
  const { isAuth } = UseAuth();
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/forbidden" state={{ from: location.pathname }} replace />
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/questions/:id" element={<QuestionPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/addquestion" element={<AddQuestionPageLazy />} />
              <Route path="/editquestions/:id" element={<EditQuestionPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
