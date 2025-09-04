import React, { useState } from "react";

const sampleQuestions = {
  mcq: {
    easy: [
      {
        question: "Which language runs in the browser?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: "JavaScript",
      },
      {
        question: "Which HTML tag is used for a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<p>"],
        answer: "<a>",
      },
    ],
    medium: [
      {
        question: "Which company developed React?",
        options: ["Google", "Microsoft", "Facebook", "Amazon"],
        answer: "Facebook",
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Styled Sections",
          "Colorful Style Syntax",
        ],
        answer: "Cascading Style Sheets",
      },
    ],
    hard: [
      {
        question: "What is the output of: typeof null?",
        options: ["null", "object", "undefined", "boolean"],
        answer: "object",
      },
    ],
  },
  short: {
    easy: [
      {
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language",
      },
      { question: "What is 2 + 2?", answer: "4" },
    ],
    medium: [
      {
        question: "Name one JavaScript framework.",
        answer: "React, Angular, or Vue",
      },
      { question: "What is the capital of France?", answer: "Paris" },
    ],
    hard: [
      {
        question: "Explain closures in JavaScript.",
        answer:
          "A closure gives access to an outer function’s scope from an inner function.",
      },
    ],
  },
  truefalse: {
    easy: [
      { question: "The sky is blue.", answer: "True" },
      { question: "5 is greater than 10.", answer: "False" },
    ],
    medium: [
      { question: "React is a backend framework.", answer: "False" },
      { question: "Water freezes at 0°C.", answer: "True" },
    ],
    hard: [{ question: "JavaScript is a compiled language.", answer: "False" }],
  },
};

const ExamGenerator = () => {
  const [type, setType] = useState("mcq");
  const [difficulty, setDifficulty] = useState("easy");
  const [question, setQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const generateQuestion = () => {
    const questions = sampleQuestions[type][difficulty];
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQ);
    setShowAnswer(false);
  };

  return (
    <div className="w-11/12 mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">📝 Exam Q&A Generator</h2>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="mcq">MCQs</option>
          <option value="short">Short Answer</option>
          <option value="truefalse">True / False</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={generateQuestion}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Generate Question
        </button>
      </div>

      {/* Question Display */}
      {question && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold">{question.question}</h3>

          {/* MCQ Options */}
          {type === "mcq" && (
            <ul className="mt-3 space-y-2">
              {question.options.map((opt, idx) => (
                <li
                  key={idx}
                  className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}

          {/* Show Answer */}
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-4 text-sm text-blue-600 underline"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          {showAnswer && (
            <p className="mt-2 text-green-700 font-semibold">
              ✅ Answer: {question.answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamGenerator;
