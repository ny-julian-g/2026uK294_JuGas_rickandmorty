import { Link } from "react-router-dom";
import { type RickAndMortyChar } from "../../service/ServerService";

interface ShowObjectDumbProps extends RickAndMortyChar {
  onDelete: (id: string|number) => void;
  onEdit: (id: string|number) => void;
}

function ShowObjectDumb({ id, name, image, created, onDelete, onEdit }: ShowObjectDumbProps) {
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmed) {
      onDelete(id.toString());
    }
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(id.toString());
  }

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <Link
        to={`/characters/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={image} alt={name} width="250em" style={{borderRadius: "1em"}}/>
        <h2>{name}</h2>
        <p>Created at: {new Date(created).toLocaleDateString()}</p>
      </Link>
      <button onClick={handleDeleteClick} style={{marginRight: "1em"}}>Delete</button>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
}

export default ShowObjectDumb;