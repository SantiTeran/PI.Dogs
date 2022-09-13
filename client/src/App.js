import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateDog from "./components/createDog";
import DogDetail from "./components/dogDetail";
// import Dogs from "./components/dogs";
import Home from "./components/home";
import LandingPage from "./components/landingPage";
// import SearchBar from "./components/searchBar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<DogDetail />} />
        <Route path="/create" element={<CreateDog />} />
      </Routes>
    </div>
  );
}

export default App;
