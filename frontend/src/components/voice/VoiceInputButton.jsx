import {
  FaMicrophone,
  FaStopCircle,
} from "react-icons/fa";

import useSpeechRecognition from "./useSpeechRecognition";

function VoiceInputButton({
  onTranscript,
  language = "en-US",
}) {
  const {
    startListening,
    stopListening,
    isListening,
  } = useSpeechRecognition(language);

  return (
    <div className="flex items-center gap-3">

      {!isListening ? (

        <button
          type="button"
          onClick={() =>
            startListening(onTranscript)
          }
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
        >
          <FaMicrophone />

          Speak

        </button>

      ) : (

        <button
          type="button"
          onClick={stopListening}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full animate-pulse"
        >
          <FaStopCircle />

          Stop

        </button>

      )}

      {isListening && (

        <span className="text-red-600 font-semibold">

          🔴 Listening...

        </span>

      )}

    </div>
  );
}

export default VoiceInputButton;