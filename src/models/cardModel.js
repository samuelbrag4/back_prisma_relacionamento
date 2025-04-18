import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todos os cards
  async findAll() {
    const cards = await prisma.card.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(cards);

    return cards;
  }

  // Obter um card pelo ID
  async findById(id) {
    const card = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
    });

    return card;
  }

  // Criar um novo card
  async create(name, rarity, damage, defense, imageUrl, collectionId) {
    const newCard = await prisma.card.create({
      data: {
        name,
        rarity,
        damage,
        defense,
        imageUrl,
        collectionId: Number(collectionId), // Relaciona o card com uma coleção
      },
    });

    return newCard;
  }

  // Atualizar um card
  async update(id, name, rarity, damage, defense, imageUrl) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    // Atualize o card existente com os novos dados
    const data = {};
    if (name !== undefined) {
      data.name = name;
    }
    if (rarity !== undefined) {
      data.rarity = rarity;
    }
    if (damage !== undefined) {
      data.damage = damage;
    }
    if (defense !== undefined) {
      data.defense = defense;
    }
    if (imageUrl !== undefined) {
      data.imageUrl = imageUrl;
    }

    const cardUpdated = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return cardUpdated;
  }

  // Remover um card
  async delete(id) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CardModel();