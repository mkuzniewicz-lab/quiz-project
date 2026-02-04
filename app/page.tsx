'use client';

import { useState } from 'react';

type Personality = 'Bold Adventurer' | 'Zen Minimalist' | 'Health Nut';

interface Question {
  question: string;
  answers: {
    text: string;
    emoji: string;
    personality: Personality;
  }[];
}

const questions: Question[] = [
  {
    question: "If you were a color, which would you be?",
    answers: [
      { text: "Bold crimson red", emoji: "🔴", personality: "Bold Adventurer" },
      { text: "Calm forest green", emoji: "🟢", personality: "Zen Minimalist" },
      { text: "Fresh mint green", emoji: "🌿", personality: "Health Nut" },
    ]
  },
  {
    question: "You find a mysterious door. What's behind it?",
    answers: [
      { text: "A lightning storm you can touch", emoji: "⚡", personality: "Bold Adventurer" },
      { text: "A peaceful zen garden", emoji: "🕊️", personality: "Zen Minimalist" },
      { text: "A greenhouse full of medicinal plants", emoji: "🌱", personality: "Health Nut" },
    ]
  },
  {
    question: "If you could only eat one texture forever, what would it be?",
    answers: [
      { text: "Sharp and intense", emoji: "🔥", personality: "Bold Adventurer" },
      { text: "Smooth and simple", emoji: "☁️", personality: "Zen Minimalist" },
      { text: "Light and crisp", emoji: "🥗", personality: "Health Nut" },
    ]
  },
  {
    question: "Pick a superpower:",
    answers: [
      { text: "Super strength", emoji: "💥", personality: "Bold Adventurer" },
      { text: "Mind reading", emoji: "🧘", personality: "Zen Minimalist" },
      { text: "Healing touch", emoji: "🌟", personality: "Health Nut" },
    ]
  },
  {
    question: "You're stranded on a desert island. What do you bring?",
    answers: [
      { text: "A knife and survival kit", emoji: "🗡️", personality: "Bold Adventurer" },
      { text: "A philosophy book", emoji: "📖", personality: "Zen Minimalist" },
      { text: "Running shoes and vitamins", emoji: "🥾", personality: "Health Nut" },
    ]
  },
  {
    question: "What weather describes your ideal day?",
    answers: [
      { text: "Thunderstorm", emoji: "⚡", personality: "Bold Adventurer" },
      { text: "Clear and calm", emoji: "☀️", personality: "Zen Minimalist" },
      { text: "Breezy and fresh", emoji: "🌤️", personality: "Health Nut" },
    ]
  },
];

const personalityInfo = {
  "Bold Adventurer": {
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    image: "/espresso.jpg"
  },
  "Zen Minimalist": {
    coffee: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    image: "/black-coffee.jpg"
  },
  "Health Nut": {
    coffee: "Oat Milk Americano",
    tagline: "Wellness in every sip",
    image: "/americano.jpg"
  }
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Personality[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (personality: Personality) => {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const counts: Record<Personality, number> = {
      "Bold Adventurer": 0,
      "Zen Minimalist": 0,
      "Health Nut": 0
    };

    answers.forEach(answer => {
      counts[answer]++;
    });

    return Object.entries(counts).map(([personality, count]) => ({
      personality: personality as Personality,
      percentage: Math.round((count / questions.length) * 100)
    })).sort((a, b) => b.percentage - a.percentage);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const results = calculateResults();

    return (
      <div className="min-h-screen flex items-center justify-center p-5"
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="bg-white rounded-[30px] p-10 max-w-2xl w-full shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-600"
              style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive' }}>
            ☕ Your Coffee Personality!
          </h1>

          <div className="space-y-6">
            {results.map(({ personality, percentage }) => (
              <div key={personality} className="border-b pb-6 last:border-b-0">
                <div className="flex gap-4 items-start mb-2">
                  <img
                    src={personalityInfo[personality].image}
                    alt={personalityInfo[personality].coffee}
                    className="w-32 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-2xl font-bold" style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {personality}
                      </h2>
                      <span className="text-3xl font-bold text-purple-600">{percentage}%</span>
                    </div>
                    <p className="text-xl text-gray-700 mb-2">
                      ☕ <strong>{personalityInfo[personality].coffee}</strong>
                    </p>
                    <p className="text-gray-600 italic">
                      {personalityInfo[personality].tagline}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={restart}
            className="mt-8 w-full py-4 rounded-[20px] text-white font-bold text-lg transition-transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00c853 0%, #00e676 100%)',
              fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive'
            }}
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-5"
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="bg-white rounded-[30px] p-10 max-w-2xl w-full shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-3 text-purple-600"
            style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive' }}>
          ☕ Coffee Personality Quiz
        </h1>

        <div className="text-center text-gray-500 mb-8">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6"
              style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive' }}>
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer.personality)}
                className="w-full py-5 px-6 rounded-[20px] text-white font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive'
                }}
              >
                <span className="text-2xl">{answer.emoji}</span>
                <span>{answer.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
