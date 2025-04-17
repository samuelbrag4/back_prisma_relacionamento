import CollectionModel from "../models/collectionModel.js";

class CollectionController {
  // GET /api/collections
  async getAllCollections(req, res) {
    try {
      const collections = await CollectionModel.findAll();
      res.json(collections);
    } catch (error) {
      console.error("Erro ao buscar collections:", error);
      res.status(500).json({ error: "Erro ao buscar collections" });
    }
  }

  // GET /api/collections/:id
  async getCollectionById(req, res) {
    try {
      const { id } = req.params;

      const collection = await CollectionModel.findById(id);

      if (!collection) {
        return res.status(404).json({ error: `Collection com ID ${id} não encontrado` });
      }

      res.json(collection);
    } catch (error) {
      console.error(`Erro ao buscar collection com ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Erro ao buscar collection" });
    }
  }

  // POST /api/collections
  async createCollection(req, res) {
    try {
      const { name, description, releaseYear } = req.body;

      // Validação de entrada
      if (!name || !description || !releaseYear) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      if (typeof releaseYear !== "number") {
        return res.status(400).json({ error: "O campo releaseYear deve ser um número" });
      }

      // Criar o novo collection
      const newCollection = await CollectionModel.create(name, description, releaseYear);

      res.status(201).json(newCollection);
    } catch (error) {
      console.error("Erro ao criar collection:", error);
      res.status(500).json({ error: "Erro ao criar collection" });
    }
  }

  // PUT /api/collections/:id
  async updateCollection(req, res) {
    try {
      const { id } = req.params;
      const { name, description, releaseYear } = req.body;

      // Validação de entrada
      if (releaseYear !== undefined && typeof releaseYear !== "number") {
        return res.status(400).json({ error: "O campo releaseYear deve ser um número" });
      }

      // Atualizar o collection
      const updatedCollection = await CollectionModel.update(id, name, description, releaseYear);

      if (!updatedCollection) {
        return res.status(404).json({ error: `Collection com ID ${id} não encontrado` });
      }

      res.json(updatedCollection);
    } catch (error) {
      console.error(`Erro ao atualizar collection com ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Erro ao atualizar collection" });
    }
  }

  // DELETE /api/collections/:id
  async deleteCollection(req, res) {
    try {
      const { id } = req.params;

      // Remover o collection
      const result = await CollectionModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: `Collection com ID ${id} não encontrado` });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error(`Erro ao remover collection com ID ${req.params.id}:`, error);
      res.status(500).json({ error: "Erro ao remover collection" });
    }
  }
}

export default new CollectionController();