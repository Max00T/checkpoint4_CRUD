import express from "express";
import cdActions from "./modules/cd/cdActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

router.get("/api/cds", cdActions.browse); // Lire tous les CDs
router.get("/api/cds/:id", cdActions.read); // Lire un CD par son ID
router.post("/api/cds", cdActions.add); // Ajouter un nouveau CD
router.put("/api/cds/:id", cdActions.edit); // Modifier un CD existant
router.delete("/api/cds/:id", cdActions.remove); // Supprimer un CD

export default router;
