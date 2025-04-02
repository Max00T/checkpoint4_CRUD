import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { deleteCd } from "../services/request";

import "../styles/Delete.css";

export default function DeleteCd() {
  const loadedCds = useLoaderData() as Cd[];
  const [cds, setCds] = useState<Cd[]>(loadedCds || []);

  // Fonction pour supprimer un CD
  const handleDelete = async (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce CD ?")) {
      try {
        await deleteCd(id); // Supprime en BDD
        setCds(cds.filter((cd) => cd.id !== id)); // Met à jour l'état local
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Erreur : impossible de supprimer le CD.");
      }
    }
  };

  return (
    <>
      <h2>Supprimer un CD</h2>

      {/* LISTE DES CDS */}
      <div className="cd-list">
        {cds.length > 0 ? (
          cds.map((cd) => (
            <div key={cd.id} className="cd-item">
              <div className="cd-info">
                <h3>
                  {cd.band_name} - {cd.album_name}
                </h3>
                <p className="release-year">📅 {cd.release_year}</p>
              </div>
              {/* {cd.cover && (
                <img src={cd.cover} alt={cd.album_name} className="cd-cover" />
              )} */}

              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(cd.id)}
              >
                Supprimer
              </button>
            </div>
          ))
        ) : (
          <p className="no-cds">📭 Aucun CD disponible.</p>
        )}
      </div>
    </>
  );
}
