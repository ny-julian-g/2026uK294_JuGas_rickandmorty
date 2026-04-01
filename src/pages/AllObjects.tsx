import { useEffect, useState } from "react";
import ShowObjectDumb from "../organisms/ShowObjectDumb";
import { ServerService, type RickAndMortyChar } from "../service/ServerService";

function AllObjects() {
  const [characters, setCharacters] = useState<RickAndMortyChar[]>([]);

  useEffect(() => {
    ServerService.getCharacters().then(setCharacters).catch(console.error);
  }, []);

  return (
    <div className="characters-container">
      {characters.map((char) => (
        <a>
          <ShowObjectDumb
            key={char.id}
            id={char.id.toString()}
            name={char.name}
            image={char.image}
            created={char.created}
          />
        </a>
      ))}
    </div>
  );
}

export default AllObjects;
