import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ServerService } from "../service/ServerService";

function DetailView() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    if (id) {
      ServerService.getCharacterById(id)
        .then(setCharacter)
        .catch(console.error);
    }
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Spezies: {character.species}</p>
      <Link to="/characters">Back to Character List</Link>
    </div>
  );
}
export default DetailView;
