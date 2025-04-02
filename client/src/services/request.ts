import axios from "axios";

//  Récupérer tous les CDs
const getAllCds = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/cds`)
    .then((response) => response.data)
    .catch((error) =>
      console.error("Erreur lors de la récupération des CDs :", error),
    );
};

// 🔹 Récupérer un CD par son ID
const getCdById = (id) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/cds/${id}`)
    .then((response) => response.data)
    .catch((error) =>
      console.error(`Erreur lors de la récupération du CD ${id} :`, error),
    );
};

//🔹 Ajouter un CD

const addCd = async (newCd) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/cds`,
      newCd,
    );
    return response.data; // retourne le CD ajouté
  } catch (error) {
    console.error("Erreur lors de l'ajout du CD :", error);
    throw new Error("Erreur lors de l'ajout du CD");
  }
};

const updateCd = (id, updatedCd) => {
  return axios
    .put(`${import.meta.env.VITE_API_URL}/api/cds/${id}`, updatedCd)
    .then((response) => response.data)
    .catch((error) =>
      console.error(`Erreur lors de la mise à jour du CD ${id} :`, error),
    );
};

// 🔹 Supprimer un CD
const deleteCd = (id) => {
  return axios
    .delete(`${import.meta.env.VITE_API_URL}/api/cds/${id}`)
    .then(() => console.log(`CD ${id} supprimé`))
    .catch((error) =>
      console.error(`Erreur lors de la suppression du CD ${id} :`, error),
    );
};

export { getAllCds, getCdById, addCd, updateCd, deleteCd };
