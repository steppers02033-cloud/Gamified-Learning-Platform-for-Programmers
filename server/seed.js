const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const { Section } = require('./models/Content');

dotenv.config();

const dummyUsers = Array.from({ length: 20 }).map((_, i) => ({
  username: `Player_${i + 1}`,
  email: `player${i + 1}@example.com`,
  password: 'password123',
  xp: Math.floor(Math.random() * 5000),
  level: Math.floor(Math.random() * 50) + 1,
  diamonds: Math.floor(Math.random() * 500),
  streak: Math.floor(Math.random() * 20),
  badges: ['First Code', i % 2 === 0 ? '7-day streak' : '1000 XP'],
}));

const sections = [
  {
    id: "basics",
    title: "Basics of Programming",
    order: 1,
    concepts: [{ title: "What is Code?", description: "Code is how we tell computers what to do.", content: "Just like we use human languages to speak to each other, we use programming languages to speak to computers.", order: 1 }],
    quizzes: [{ question: "What is code?", options: ["A secret message", "Instructions for a computer", "A video game", "Food"], correctAnswer: 1, xpReward: 10 }],
    challenges: [{ title: "First Program", description: "Print 'Hello, World!' to the console.", difficulty: "Easy", initialCode: "function solve() {\n  // Write your code here\n}", testCases: [{ input: "", expectedOutput: "Hello, World!"}], xpReward: 50, diamondReward: 5 }]
  },
  {
    id: "variables",
    title: "Variables & Data Types",
    order: 2,
    concepts: [], quizzes: [], challenges: []
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding');

    await User.deleteMany();
    await Section.deleteMany();

    console.log('Old Data Destroyed');

    for (let u of dummyUsers) {
      await User.create(u);
    }
    console.log('20 Dummy Users Created');

    await Section.insertMany(sections);
    console.log('Learning Sections Created');

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
