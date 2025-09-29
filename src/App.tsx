import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home';
import PlaceholderPage from './Components/Pages/PlaceholderPage';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PlaceholderPage title="Register" />} />
        <Route path="/signin" element={<PlaceholderPage title="Sign In" />} />
        <Route path="/search" element={<PlaceholderPage title="Search" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
