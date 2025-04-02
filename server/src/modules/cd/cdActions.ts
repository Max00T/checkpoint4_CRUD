import type { RequestHandler } from "express";

import cdRepository from "./cdRepository";

// BROWSE - Lire tous les CDs
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all cd
    const cds = await cdRepository.readAll();

    res.json(cds);
  } catch (err) {
    next(err);
  }
};

// READ - Lire un CD par son ID
const read: RequestHandler = async (req, res, next) => {
  try {
    const cdId = Number(req.params.id);
    const cd = await cdRepository.read(cdId);
    if (cd == null) {
      res.sendStatus(404);
    } else {
      res.json(cd);
    }
  } catch (err) {
    next(err);
  }
};

// ADD - Ajouter un CD

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCd = {
      band_name: req.body.band_name,
      album_name: req.body.album_name,
      release_year: req.body.release_year,
      cover: req.body.cover || null,
    };

    const insertId = await cdRepository.create(newCd);

    // Retourner une réponse avec le statut 201 et l'ID du CD ajouté
    res.status(201).json({ id: insertId });
  } catch (err) {
    next(err);
  }
};

// EDIT - Modifier un CD existant
const edit: RequestHandler = async (req, res, next) => {
  try {
    const cdId = Number(req.params.id);
    const editCd = req.body;

    console.info("ID reçu :", cdId);
    console.info("Données reçues :", editCd);

    const affectedRows = await cdRepository.update(cdId, editCd);

    console.info("Lignes affectées :", affectedRows);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "CD non trouvé" });
    }

    // Renvoyer les données mises à jour
    res.status(200).json(editCd);
  } catch (err) {
    console.error("Erreur complète :", err);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour",
      error: err instanceof Error ? err.message : "Erreur inconnue",
    });
  }
};

// DELETE - Supprimer un CD
const remove: RequestHandler = async (req, res, next) => {
  try {
    const cdId = Number(req.params.id);
    await cdRepository.delete(cdId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, remove };
