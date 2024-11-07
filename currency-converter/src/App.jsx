import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Results from "./pages/Results";
function App() {
  document.title = "Currency Converter";
  return (
    <>
    {/*Routes*/}
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/results" element={<Results />}/>
        <Route path="/favourites" element={<Favourites />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
