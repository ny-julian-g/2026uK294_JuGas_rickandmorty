import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import hinzufügen
import ShowObjectDumb from "../organisms/ShowObjectDumb";
import { ServerService, type RickAndMortyChar } from "../service/ServerService";

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
    navigate(`/characters/${id}/edit`); // Das führt den Seitenwechsel aus
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
      <button onClick={() => navigate("/characters/new")} style={{position:"sticky", top:"0", float: "right", borderRadius:"3em", left:"0", backgroundColor:"lightblue", color:"white", border:"0px", width:"2em", height:"2em", fontSize:"2em"}}>+</button>
    </div>
  );
}

export default AllObjects;