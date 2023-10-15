import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./pages/Main";
import MyList from "./pages/MyList";
import SelectPlace from "./pages/SelectPlace";
import ShowRoute from "./pages/ShowRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/mylist" element={<MyList/>} />
          <Route path="/selectplace" element={<SelectPlace/>} />
          <Route path="/showroute/:key" element={<ShowRoute/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
