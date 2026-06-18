const Question = require("../models/question.model");

// Ajouter une question
exports.ajouterQuestion = async (req, res) => {
  try {
    const { titre, description, auteur } = req.body;

    const question = await Question.create({
      titre,
      description,
      auteur,
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Récupérer toutes les questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({
      createdAt: -1,
    });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};