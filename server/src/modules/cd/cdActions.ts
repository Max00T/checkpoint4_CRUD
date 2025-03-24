import type { RequestHandler } from "express";

// Import access to data
import cdRepository from "./cdRepository";

// BROWSE - Lire tous les CDs
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all cd
    const cds = await cdRepository.readAll();
    // Respond with the cd in JSON format
    res.json(cds);
  } catch (err) {
    // Pass any errors to the error-handling middleware
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
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// ADD - Ajouter un CD

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the cd data from the request body
    const newCd = { band_name, album_name, release_year, cover };
    const insertId = await cdRepository.create(newCd);

    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// EDIT - Modifier un CD existant
const edit: RequestHandler = async (req, res, next) => {
  try {
    const cdId = Number(req.params.id);

    const affectedRows = await cdRepository.update(editCd);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
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
