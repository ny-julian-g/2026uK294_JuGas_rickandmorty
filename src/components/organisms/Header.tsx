import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Hard Reload um alle States zu resetten
  };

  const manageTitle = () => {
    if (pathname === "/characters") return "Characters";
    if (pathname === "/characters/new") return "Create Character";
    if (pathname === "/login") return "Please Log In";
    if (pathname.includes("/edit")) return "Edit Character";
    if (pathname.match(/\/characters\/\d+$/)) return "Character Details"; // Erkennt /characters/1
    
    return "Rick and Morty App";
  };

  const isLoginPage = pathname === "/login";

  return (
    <div
      style={{
        backgroundColor: "#505050",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        padding: "10px 20px",
      }}
    >
      <div style={{ width: "20%" }}></div>

      <h1 style={{ margin: 0 }}>{manageTitle()}</h1>

      <div style={{ width: "20%", textAlign: "right" }}>
        {!isLoginPage && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "lightblue",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;