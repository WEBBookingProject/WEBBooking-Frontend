import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components1/pages1/Home";
import PlaceholderPage from "./components1/pages1/PlaceholderPage";
import Search from "./components1/pages1/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<PlaceholderPage title="Register" />}
        />
        <Route path="/signin" element={<PlaceholderPage title="Sign In" />} />
        <Route path="/search" element={<Search />} />
        <Route path="/hotel" element={<PlaceholderPage title="Hotel page" />} />
        <Route path="/map" element={<PlaceholderPage title="Map page" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
