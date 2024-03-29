import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Join from "./Join.js";
import Login from "./Login.js";
import Add from "./Add.js";
import Detail from './Detail';
import Edit from './Edit';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/" element={<Login/>} />
          <Route path="/add" element={<Add/>}/>
          <Route path="/detail/:post_id" element={<Detail/>}/>
          <Route path="/edit/:post_id" element={<Edit/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
