import express from "express";
import CardController from "../controllers/cardController.js";

const cardsRouter = express.Router();

// Rotas de Cards
// GET /api/cards - Listar todos os cards
cardsRouter.get("/", CardController.getAllCards);

// GET /api/cards/:id - Obter um Card pelo ID
cardsRouter.get("/:id", CardController.getCardById);

// POST /api/cards - Criar um novo Card
cardsRouter.post("/", CardController.createCard);

// PUT /api/cards/:id - Atualizar um Card
cardsRouter.put("/:id", CardController.updateCard);

// DELETE /api/cards/:id - Remover um Card
cardsRouter.delete("/:id", CardController.deleteCard);

export default cardsRouter;
