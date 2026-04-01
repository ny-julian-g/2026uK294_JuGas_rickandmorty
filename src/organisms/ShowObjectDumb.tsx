import { Link } from "react-router-dom";
import { type RickAndMortyChar } from "../service/ServerService";

interface ShowObjectDumbProps extends RickAndMortyChar {
  onDelete: (id: string|number) => void;
}

function ShowObjectDumb({ id, name, image, created, onDelete }: ShowObjectDumbProps) {
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmed) {
      onDelete(id.toString());
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <Link
        to={`/characters/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>Created at: {new Date(created).toLocaleDateString()}</p>
      </Link>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default ShowObjectDumb;