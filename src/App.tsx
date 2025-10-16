import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import PlaceholderPage from "./components/pages/PlaceholderPage";
import Search from "./components/pages/Search";
import DetailsPage from "./components/pages/DetailsPage";
import BookingPage from "./components/pages/BookingPage";

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
        <Route
          path="/hotel/:id"
          element={<PlaceholderPage title="Hotel page" />}
        />
        <Route path="/map" element={<PlaceholderPage title="Map page" />} />
        <Route path="/details/:id" element={<DetailsPage />} /> 
        <Route path="/booking" element={<BookingPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
