import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  askQuestion,
  getChatHistory,
} from "../services/chatService";

function Chat() {

  const { id } = useParams();

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {

    try {

      const data = await getChatHistory(id);

      setMessages(data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadHistory();

  }, []);

  const sendQuestion = async () => {

    if (!question.trim()) return;

    try {

      setLoading(true);

      const response = await askQuestion(
        id,
        question
      );

      setMessages((prev) => [

        ...prev,

        response

      ]);

      setQuestion("");

    } catch (err) {

      console.log(err);

      alert("Unable to get AI response.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">

          AI Medical Assistant

        </h1>

        <div className="bg-white rounded-xl shadow p-6 h-[550px] overflow-y-auto">

          {

            messages.length === 0 && (

              <p>

                Ask any question regarding your assessment.

              </p>

            )

          }

          {

            messages.map((msg) => (

              <div

                key={msg.id}

                className="mb-8"

              >

                <div className="bg-blue-100 p-4 rounded-lg">

                  <strong>

                    You

                  </strong>

                  <p>

                    {msg.user_question}

                  </p>

                </div>

                <div className="bg-green-100 p-4 rounded-lg mt-3">

                  <strong>

                    AI

                  </strong>

                  <p>

                    {msg.ai_response}

                  </p>

                </div>

              </div>

            ))

          }

        </div>

        <div className="flex gap-4 mt-5">

          <input

            type="text"

            value={question}

            onChange={(e) =>
              setQuestion(e.target.value)
            }

            placeholder="Ask about your symptoms..."

            className="flex-1 border rounded-lg p-4"

          />

          <button

            onClick={sendQuestion}

            disabled={loading}

            className="bg-blue-600 text-white px-8 rounded-lg"

          >

            {

              loading

                ? "Sending..."

                : "Send"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default Chat;