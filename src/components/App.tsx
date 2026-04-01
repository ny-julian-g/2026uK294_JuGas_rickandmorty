import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import AllObjects from "./pages/AllObjects";
import DetailView from "./pages/DetailView";
import EditObject from "./pages/EditObject";
import AddObject from "./pages/AddObject";
import Header from "./organisms/Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={<LogIn onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/characters"
          element={isLoggedIn ? <AllObjects /> : <Navigate to="/login" />}
        />
        <Route path="/characters/:id/edit" element={isLoggedIn ? <EditObject/> : <Navigate to="/login" />} />
        <Route path="/characters/:id"
         element={isLoggedIn ? <DetailView /> : <Navigate to="/login" />} />
         <Route path="/characters/new" element={isLoggedIn ? <AddObject/> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/characters" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
