import express from "express";

// Importar todas as Rotas
import authRouter from "./auth.routes.js";
import animesRouter from "./animeRoutes.js";
import personagemRouter from "./personagemRoutes.js";
import collectionRouter from "./collectionRoutes.js";
import cardRouter from "./cardRoutes.js";

import authMiddleware from "../moddleware/authMiddleware.js";

const router = express.Router();

// Rotas Públicas
router.use("/auth", authRouter);

// Rotas Particulares/Protegidas
router.use(authMiddleware);

router.use("/animes", animesRouter);
router.use("/personagens", personagemRouter);
router.use("/collections", collectionRouter);
router.use("/cards", cardRouter);

export default router;