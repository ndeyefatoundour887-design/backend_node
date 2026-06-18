const express = require("express");
const router = express.Router();

const {
  ajouterQuestion,
  getQuestions,
} = require("../controllers/question.controller");

router.post("/ajouter", ajouterQuestion);
router.get("/", getQuestions);

module.exports = router;