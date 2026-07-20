const suggestions = [
  "Should I visit a doctor immediately?",
  "Explain my symptoms in simple words.",
  "What foods should I avoid?",
  "How can I reduce the pain?",
  "Are there any warning signs?",
];

function SuggestedQuestions({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-600 hover:text-white transition"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default SuggestedQuestions;