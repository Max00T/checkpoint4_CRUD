import { useState, useEffect } from "react";
import { getAllCds, addCd, updateCd } from "../services/request";
import "../styles/ManageCd.css";

export default function ManageCd() {
  const [cds, setCds] = useState<Cd[]>([]);
  const [cd, setCd] = useState<Cd>({
    id: null,
    band_name: "",
    album_name: "",
    release_year: new Date().getFullYear(),
    cover: "",
    rating: "3", // Valeur par défaut
    review_text: "",
  });

  // Charger les CDs au chargement du composant
  useEffect(() => {
    const loadCds = async () => {
      try {
        const data = await getAllCds();
        setCds(data);
      } catch (error) {
        alert("Erreur lors du chargement des CDs");
      }
    };

    loadCds();
  }, []);

  // Gestion du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCd({ ...cd, [e.target.name]: e.target.value });
  };

  // (Ajout ou Mise à jour) du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.info("Envoi des données :", cd);
      if (cd.id != null) {
        // Modifier un CD existant
        const updatedCd = await updateCd(cd.id, cd);
        setCds(
          cds.map((item) => (item.id === updatedCd.id ? updatedCd : item)),
        );
        alert("CD mis à jour avec succès !");
      } else {
        // Ajouter un nouveau CD
        const newCd = await addCd(cd);
        //setCds([...cds, newCd]); // Mettre à jour la liste obligé de faire F5 pour voir le nouveau CD
        // 🔥 Mise à jour immédiate pour éviter le rafraîchissement manuel
        setCds((prevCds) => [...prevCds, { id: newCd.insertId, ...cd }]);
        alert("CD ajouté avec succès !");
      }

      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Erreur lors de l'enregistrement du CD.");
    }
  };

  // Remplir le formulaire pour modification
  const handleEdit = (cdToEdit: Cd) => {
    setCd(cdToEdit);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setCd({
      id: null,
      band_name: "",
      album_name: "",
      release_year: new Date().getFullYear(),
      cover: "",
    });
  };

  return (
    <>
      <h2 id="top">Gérer les CDs</h2>

      {/* FORMULAIRE */}
      <form onSubmit={handleSubmit} className="cd-form">
        <label htmlFor="band_name">Groupe :</label>
        <input
          id="band_name"
          type="text"
          name="band_name"
          value={cd.band_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="album_name">Album :</label>
        <input
          id="album_name"
          type="text"
          name="album_name"
          value={cd.album_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="release_year">Année :</label>
        <input
          id="release_year"
          type="number"
          name="release_year"
          value={cd.release_year}
          onChange={handleChange}
          required
        />

        <label htmlFor="cover">Pochette :</label>
        <input
          id="cover"
          type="text"
          name="cover"
          value={cd.cover || ""}
          onChange={handleChange}
          placeholder="URL de l'image (non obligatoire)"
        />
        <label htmlFor="rating">Note (1-5) :</label>
        <input
          id="rating"
          type="number"
          name="rating"
          value={cd.rating}
          min="1"
          max="5"
          onChange={handleChange}
          required
        />

        <label htmlFor="review_text">Avis :</label>
        <textarea
          id="review_text"
          name="review_text"
          value={cd.review_text}
          onChange={handleChange}
          placeholder="(non obligatoire)"
        />
        <button type="submit" className="save-btn">
          {cd.id ? "Modifier" : "Ajouter"} le CD
        </button>
        {cd.id && (
          <button type="button" className="reset-btn" onClick={resetForm}>
            Annuler
          </button>
        )}
      </form>

      {/* LISTE DES CDS */}
      <div className="cd-list">
        {cds.length > 0 ? (
          cds.map((cdItem) => (
            <div key={cdItem.id} className="cd-item">
              <div className="cd-info">
                <h3>
                  {cdItem.band_name} - {cdItem.album_name}
                </h3>
                <p className="release-year">📅 {cdItem.release_year}</p>
              </div>
              {cdItem.cover && (
                <img
                  src={cdItem.cover}
                  alt={cdItem.album_name}
                  className="cd-cover"
                />
              )}
              <button
                className="edit-btn"
                type="button"
                onClick={() => {
                  handleEdit(cdItem);
                  window.location.href = "#top"; // Navigue vers l'ancre
                }}
              >
                ✏️ Modifier
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
