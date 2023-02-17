import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UpdateEmployee from "./Pages/UpdateEmployee";
import GetAllEmployee from "./Pages/GetAllEmployee";
import CreateEmployee from "./Pages/CreateEmployee";
import GetAllDepartment from "./Pages/GetAllDepartment";
import CreateDepartment from "./Pages/CreateDepartment";
import UpdateDepartment from "./Pages/UpdateDepartment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetAllEmployee />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/update/:employeeId" element={<UpdateEmployee />} />
        <Route path="/getalldepartment" element={<GetAllDepartment />} />
        <Route path="/createdepartment" element={<CreateDepartment />} />
        <Route
          path="/updatedepartment/:departmentTypeId"
          element={<UpdateDepartment />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
