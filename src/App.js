import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./components/Nabar";
import { FevMovies } from "./pages/FevMovies";

function App() {
  return (

    <div className="App">
      <Navbar/>

      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/fav" Component={FevMovies} />

      </Routes>
    </div>
  );
}

export default App;
