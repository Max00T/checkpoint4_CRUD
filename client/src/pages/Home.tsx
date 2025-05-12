import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../styles/Home.css";
import type {Cd} from "../types/index"

export default function Home() {
  const cds = useLoaderData() as Cd[];
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les CD en fonction du texte de recherche
  const filteredCds = cds.filter((cd) =>
    `${cd.band_name} ${cd.album_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );



  
  return (
    <>
      <h2>Liste des CD</h2>
      <div className="Dynamicsearch">
        <input
          type="text"
          placeholder="Rechercher un CD..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <ul className="cd-list">
        {filteredCds.map((cd) => (
          <li key={cd.id} className="cd-item">
            <div className="description">
              <h3>
                {cd.band_name} - {cd.album_name} ({cd.release_year})
              </h3>

              {cd.rating && (
                <div className="cd-details">
                  <p>Note : {cd.rating}/5</p>
                  <p>{cd.review_text}</p>
                </div>
              )}
            </div>

            {cd.cover && (
              <img
                src={cd.cover}
                alt={`${cd.album_name} cover`}
                className="cd-cover"
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
