const Question = require('../models/question.model');



exports.creerQuestion = async (req, res) => {
    try {
        const { titre, description, tags } = req.body;
      
        const question = await Question.create({
            titre,
            description,
            auteur: req.user.id,
            tags
        });
        res.status(201).json({message:'Quéstion créer avec succés' , question});
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
};


exports.AfficherQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate("auteur", "nom email",) 
            .sort({ createdAt: -1 }); 

        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("auteur", "nom email");

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable",
      });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.modifierQuestion = async (req, res) => {
  try {
    const { titre, description, tags } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable",
      });
    }

    if (question.auteur.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Vous ne pouvez modifier que vos propres questions.",
      });
    }

    question.titre = titre;
    question.description = description;
    question.tags = tags;

    await question.save();

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.supprimerQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question introuvable",
      });
    }

    await Question.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Question supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};