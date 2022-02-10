import { Routes, Route, Link } from "react-router-dom"
import "antd/dist/antd.css"
import "./App.css"
import Home from "./Home"
import AppSelectSession from "./AppSelectSession"
import AppResult from "./AppResult"
import SingleQuiz from "./SingleQuiz/SingleQuiz"
import { Provider } from "react-redux"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Future Cars!</h3>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result/:id" element={<SingleQuiz />} />
        <Route path="/selector/:id" element={<AppSelectSession />} />
      </Routes>
    </div>
  )
}

export default App
