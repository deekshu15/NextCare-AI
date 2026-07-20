function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="bg-white rounded-2xl px-6 py-4 shadow">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
          <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-150"></span>
          <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;