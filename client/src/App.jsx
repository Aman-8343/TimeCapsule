import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateCapsule from "./pages/CreateCapsule";
import ViewCapsule from "./pages/ViewCapsule";

function App() {
  return (
    
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateCapsule />} />
        <Route path="/capsule/:id" element={<ViewCapsule />} />
      </Routes>
   
  );
}

export default App;
