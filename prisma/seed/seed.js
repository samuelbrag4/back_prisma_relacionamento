import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed...");

  // Criar coleções
  const dragonBall = await prisma.collection.create({
    data: {
      name: "Dragon Ball Super",
      description: "Cards do universo Dragon Ball Super",
      releaseYear: 2023,
    },
  });

  const naruto = await prisma.collection.create({
    data: {
      name: "Naruto Shippuden",
      description: "Cards do universo Naruto",
      releaseYear: 2022,
    },
  });

  console.log("Coleções criadas...");

  // Criar cards para Dragon Ball
  const dbCards = await Promise.all([
    prisma.card.create({
      data: {
        name: "Goku Ultra Instinct",
        rarity: "Ultra Rare",
        attackPoints: 9500,
        defensePoints: 8200,
        imageUrl: "https://example.com/goku.jpg",
        collectionId: dragonBall.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Vegeta Blue Evolution",
        rarity: "Super Rare",
        attackPoints: 9000,
        defensePoints: 8500,
        imageUrl: "https://example.com/vegeta.jpg",
        collectionId: dragonBall.id,
      },
    }),
  ]);

  // Criar cards para Naruto
  const narutoCards = await Promise.all([
    prisma.card.create({
      data: {
        name: "Naruto Uzumaki",
        rarity: "Legendary",
        attackPoints: 8800,
        defensePoints: 7500,
        imageUrl: "https://example.com/naruto.jpg",
        collectionId: naruto.id,
      },
    }),
    prisma.card.create({
      data: {
        name: "Sasuke Uchiha",
        rarity: "Epic",
        attackPoints: 8700,
        defensePoints: 7600,
        imageUrl: "https://example.com/sasuke.jpg",
        collectionId: naruto.id,
      },
    }),
  ]);

  console.log("Cards criados...");

  console.log(
    `Seed concluído com sucesso! Coleções: ${await prisma.collection.count()} e Cards: ${await prisma.card.count()}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });