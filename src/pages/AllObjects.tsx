import { useEffect, useState } from "react";
import ShowObjectDumb from "../organisms/ShowObjectDumb";
import { ServerService, type RickAndMortyChar } from "../service/ServerService";

function AllObjects() {
  const [characters, setCharacters] = useState<RickAndMortyChar[]>([]);

  useEffect(() => {
    ServerService.getCharacters().then(setCharacters);
  }, []);

  const handleDeleteCharacter = async (id: string | number) => {
  try {
    await ServerService.deleteCharacter(id);
    setCharacters((prev) => prev.filter((char) => char.id.toString() !== id.toString()));
  } catch (error) {
    console.error("Delete failed", error);
  }
};;

  return (
    <div className="grid">
      {characters.map((char) => (
        <ShowObjectDumb
          key={char.id}
          {...char}
          onDelete={handleDeleteCharacter}
        />
      ))}
    </div>
  );
}

export default AllObjects;
