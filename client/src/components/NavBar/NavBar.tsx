import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">CD Manager</h1>
      <ul className="nav-links">
        {/* <li>
          <Link to="/">Accueil</Link>
        </li> */}

        <li>
          <Link to="/">
            <img
              className="iconeNav"
              src="https://img.icons8.com/?size=100&id=49725&format=png&color=000000"
              alt="Supprimer"
              // style={{ width: "20px", height: "20px" }}
            />
          </Link>
        </li>

        {/* <li>
          <Link to="/manage">Ajouter/Modifier</Link>
        </li> */}

        <li>
          <Link to="/manage">
            <img
              className="iconeNav"
              src="https://img.icons8.com/?size=100&id=50144&format=png&color=000000"
              alt="Supprimer"
              // style={{ width: "20px", height: "20px" }}
            />
          </Link>
        </li>

        {/* <li>
          <Link to="/delete">Supprimer</Link>
        </li> */}

        <li>
          <Link to="/delete">
            <img
              className="iconeNav"
              src="https://img.icons8.com/?size=100&id=43024&format=png&color=000000"
              alt="Supprimer"
              // style={{ width: "20px", height: "20px" }}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
