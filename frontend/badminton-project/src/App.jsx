import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tournaments from "./pages/Tournaments";
import CreateTournament from "./pages/CreateTournament";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/create" element={<CreateTournament />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;