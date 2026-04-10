const mongoose = require('mongoose');

const ConceptSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  order: Number
});

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number, // index of option
  xpReward: { type: Number, default: 10 }
});

const ChallengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  initialCode: String,
  testCases: [{
    input: String,
    expectedOutput: String
  }],
  xpReward: { type: Number, default: 50 },
  diamondReward: { type: Number, default: 5 }
});

const SectionSchema = new mongoose.Schema({
  id: String,
  title: String,
  order: Number,
  concepts: [ConceptSchema],
  quizzes: [QuizSchema],
  challenges: [ChallengeSchema]
});

module.exports = {
  Section: mongoose.model('Section', SectionSchema)
};
