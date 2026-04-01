import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ServerService,
  type RickAndMortyChar,
} from "../../service/ServerService";

function DetailView() {
  const { id } = useParams<{ id: string }>();
  const [char, setChar] = useState<RickAndMortyChar | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) ServerService.getCharacterById(id).then(setChar);
  }, [id]);

  if (!char) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "30px",
        border: "1px solid #ccc",
        margin: "20px",
      }}
    >
      <img
        src={char.image}
        alt={char.name}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <div>
        <h1>{char.name}</h1>
        <hr />
        <p>
          <strong>Status:</strong> {char.status}
        </p>
        <p>
          <strong>Species:</strong> {char.species}
        </p>
        <p>
          <strong>Gender:</strong> {char.gender}
        </p>
        <p>
          <strong>Created:</strong> {new Date(char.created).toLocaleString()}
        </p>
        <p>
          <strong>ID:</strong> {char.id}
        </p>
        <button
          onClick={() => navigate("/characters/")}
          style={{ marginBottom: "20px", cursor: "pointer" }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
export default DetailView;
