import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionsRouter = express.Router();

// Rotas de Coleções
// GET /collections - Listar todos os collections
collectionsRouter.get("/", CollectionController.getAllCollections);

// GET /collections/:id - Obter um Collection pelo ID
collectionsRouter.get("/:id", CollectionController.getCollectionById);

// POST /collections - Criar um novo Collection
collectionsRouter.post("/", CollectionController.createCollection);

// PUT /collections/:id - Atualizar um Collection
collectionsRouter.put("/:id", CollectionController.updateCollection);

// DELETE /collections/:id - Remover um Collection
collectionsRouter.delete("/:id", CollectionController.deleteCollection);

export default collectionsRouter;
