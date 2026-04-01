import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import hinzufügen
import ShowObjectDumb from "../organisms/ShowObjectDumb";
import { ServerService, type RickAndMortyChar } from "../../service/ServerService";

function AllObjects() {
  const [characters, setCharacters] = useState<RickAndMortyChar[]>([]);
  const navigate = useNavigate(); // 2. Hook initialisieren

  useEffect(() => {
    ServerService.getCharacters().then(setCharacters);
  }, []);

  const handleDeleteCharacter = async (id: string | number) => {
    try {
      await ServerService.deleteCharacter(id);
      setCharacters((prev) =>
        prev.filter((char) => char.id.toString() !== id.toString()),
      );
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const handleEditCharacter = (id: string | number) => {
    navigate(`/characters/${id}/edit`); 
  };

  return (
    <div className="grid">
      {characters.map((char) => (
        <ShowObjectDumb
          key={char.id}
          {...char}
          onDelete={handleDeleteCharacter}
          onEdit={handleEditCharacter}
        />
      ))}
      <button
        onClick={() => navigate("/characters/new")}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          borderRadius: "50%",
          backgroundColor: "lightblue",
          color: "white",
          border: "none",
          width: "60px",
          height: "60px",
          fontSize: "30px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1000, 
        }}
      >
        +
      </button>
    </div>
  );
}

export default AllObjects;
