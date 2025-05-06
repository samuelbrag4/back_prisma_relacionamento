import express from "express";
import CollectionController from "../controllers/collectionController.js";

import authMiddleware from "../moddleware/authMiddleware.js";

const collectionRouter = express.Router();

// Rotas de Coleções
// GET /colecoes - Listar todas as Coleções
collectionRouter.get("/", CollectionController.getAllCollections);

// GET /colecoes/:id - Obter uma Coleção pelo ID
collectionRouter.get("/:id", CollectionController.getCollectionById);

// POST /colecoes - Criar uma nova Coleção - autenticada
collectionRouter.post("/", authMiddleware, CollectionController.createCollection);

// PUT /colecoes/:id - Atualizar uma Coleção
collectionRouter.put("/:id", CollectionController.updateCollection);

// DELETE /colecoes/:id - Remover uma Coleção
collectionRouter.delete("/:id", CollectionController.deleteCollection);

export default collectionRouter;
