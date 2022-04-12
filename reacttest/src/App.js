import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Nav from "./Nav.js";
import Join from "./Join.js";
import Login from "./Login.js";
import Home from "./Home.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
          <Routes>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
