import CardModel from "../models/cardModel.js";

class CardController {
  // GET /api/cards
  async getAllCards(req, res) {
    try {
      const cards = await CardModel.findAll();
      res.json(cards);
    } catch (error) {
      console.error("Erro ao buscar cards:", error);
      res.status(500).json({ error: "Erro ao buscar cards" });
    }
  }

  // GET /api/cards/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const card = await CardModel.findById(id);

      if (!card) {
        return res
          .status(404)
          .json({ error: `Card com ID ${id} não encontrado` });
      }

      res.json(card);
    } catch (error) {
      console.error(`Erro ao buscar card com ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Erro ao buscar card" });
    }
  }

  // POST /api/cards
  async createCard(req, res) {
    try {
      const { name, rarity, damage, defense, imageUrl, collectionId } =
        req.body;

      // Validação de entrada
      if (
        !name ||
        !rarity ||
        damage === undefined ||
        defense === undefined ||
        !collectionId
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      if (typeof damage !== "number" || typeof defense !== "number") {
        return res
          .status(400)
          .json({ error: "Os campos damage e defense devem ser números" });
      }

      // Criar o novo card
      const newCard = await CardModel.create(
        name,
        rarity,
        damage,
        defense,
        imageUrl,
        collectionId
      );

      res.status(201).json(newCard);
    } catch (error) {
      console.error("Erro ao criar card:", error);
      res.status(500).json({ error: "Erro ao criar card" });
    }
  }

  // PUT /api/cards/:id
  async updateCard(req, res) {
    try {
      const { id } = req.params;
      const { name, rarity, damage, defense, imageUrl } = req.body;

      // Validação de entrada
      if (damage !== undefined && typeof damage !== "number") {
        return res
          .status(400)
          .json({ error: "O campo damage deve ser um número" });
      }

      if (defense !== undefined && typeof defense !== "number") {
        return res
          .status(400)
          .json({ error: "O campo defense deve ser um número" });
      }

      // Atualizar o card
      const updateCard = await CardModel.update(
        id,
        name,
        rarity,
        damage,
        defense,
        imageUrl
      );

      if (!updateCard) {
        return res
          .status(404)
          .json({ error: `Card com ID ${id} não encontrado` });
      }

      res.json(updateCard);
    } catch (error) {
      console.error(`Erro ao atualizar card com ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Erro ao atualizar card" });
    }
  }

  // DELETE /api/cards/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover o card
      const result = await CardModel.delete(id);

      if (!result) {
        return res
          .status(404)
          .json({ error: `Card com ID ${id} não encontrado` });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error(`Erro ao remover card com ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Erro ao remover card" });
    }
  }
}

export default new CardController();

