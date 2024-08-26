import React, { useState } from 'react';
import BackButton from '../components/BackButton';
const Test = () => {
    const questions=[
        {
          "question": "What is the capital of France?",
          "options": ["Berlin", "Madrid", "Paris", "Rome"],
          "correct": 2
        },
        {
          "question": "Which planet is known as the Red Planet?",
          "options": ["Earth", "Mars", "Jupiter", "Saturn"],
          "correct": 1
        },
        {
          "question": "Who wrote 'Hamlet'?",
          "options": ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Mark Twain"],
          "correct": 2
        },
        // Add more questions here
      ]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setIsSubmitted(true);
  };

  return (
    <div className=" w-[90%] md:w-[60%] m-auto p-6 mt-24 bg-slate-800 shadow-lg rounded-lg  items-center justify-center">
        <BackButton/>
      {!isSubmitted ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="text-lg mb-6 text-gray-200">{questions[currentQuestionIndex].question}</p>
          <div className="mb-6">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={index}
                    checked={selectedAnswers[currentQuestionIndex] === index}
                    onChange={() => handleOptionSelect(index)}
                    className="mr-2 w-[18px] h-[18px] rounded-full"
                  />
                  <span className="text-lg text-slate-300">{option}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === 0 ? 'bg-gray-500' : 'bg-gray-900 text-white'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === questions.length - 1 ? 'bg-gray-500' : 'bg-gray-900 text-white'
              }`}
            >
              Next
            </button>
            {currentQuestionIndex === questions.length - 1 && (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-amber-100">Results</h2>
          <p className="text-lg mb-6 text-gray-300">You scored {score} out of {questions.length}.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-950 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};
export default Test;
