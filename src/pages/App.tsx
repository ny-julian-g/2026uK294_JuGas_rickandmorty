import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LogIn from "./LogIn";
import AllObjects from "./AllObjects";
import DetailView from "./DetailView";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LogIn onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/characters"
          element={isLoggedIn ? <AllObjects /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/characters" />} />
        <Route path="/characters/:id"
         element={isLoggedIn ? <DetailView /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
