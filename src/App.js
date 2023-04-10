import { Routes, Route} from "react-router-dom";
import Dashboard from "./component/Dashboard";
import NewActivity from "./component/NewActivity";

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/detail/:id" element={<NewActivity />} />
        </Routes>  
    </>
  );
}

export default App;
