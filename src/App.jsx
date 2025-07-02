import "./App.css";
import { MainLayout } from "./components/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Hello World!</div>} />
          <Route path="main" element={<div>Hello Main!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
