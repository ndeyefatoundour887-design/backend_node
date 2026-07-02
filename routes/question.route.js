const express = require("express");
constauthMiddleware = require("../middleware/user.middleware");

const {
  creerQuestion,
  AfficherQuestions,
  getQuestionById,
   modifierQuestion,
  supprimerQuestion,
} = require("../controllers/question.controller");

const authMiddleware = require("../middleware/user.middleware");

const router = express.Router();

router.post("/", authMiddleware, creerQuestion);
router.get("/", AfficherQuestions);
router.get("/:id", getQuestionById);
router.put("/:id", authMiddleware, modifierQuestion);
router.delete("/:id", authMiddleware, supprimerQuestion);

module.exports = router;