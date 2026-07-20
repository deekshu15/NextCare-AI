import { FaPaperPlane } from "react-icons/fa";

function ChatInput({
  value,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-3 mt-4"
    >
      <textarea
        rows={2}
        value={value}
        onChange={onChange}
        placeholder="Ask a follow-up question..."
        className="flex-1 border rounded-xl p-4 resize-none"
      />

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
}

export default ChatInput;