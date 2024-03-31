import AddStudent from "./components/AddStudent";
import EditStudents from "./components/EditStudents";
import Students from "./components/Students";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/add/student" element={<AddStudent />} />
        <Route path="/edit/student" element={<EditStudents />} />
      </Routes>
    </div>
  );
};

export default App;
