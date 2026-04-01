import { Link } from "react-router-dom";
import "../styles/StyleObjects.css";

interface RickMorty {
  id: string;
  name: string;
  image: string;
  created: string;
}

function ShowObjectDumb({ id, name, image, created }: RickMorty) {
  return (
    <Link
      to={`/characters/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div id={id}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>Created at: {new Date(created).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}

export default ShowObjectDumb;
