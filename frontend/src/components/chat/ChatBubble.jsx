import { FaRobot, FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-6`}
    >
      <div
        className={`flex gap-3 max-w-3xl ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {isUser ? <FaUser /> : <FaRobot />}
        </div>

        <div
          className={`rounded-2xl px-5 py-4 shadow-sm ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          {isUser ? (
            <p>{message.message}</p>
          ) : (
            <div className="prose max-w-none">
              <ReactMarkdown>
                {message.message}
              </ReactMarkdown>
            </div>
          )}

          <p className="text-xs opacity-60 mt-3">
            {new Date(
              message.created_at
            ).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;