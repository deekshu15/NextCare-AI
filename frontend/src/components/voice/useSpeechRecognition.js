import { useRef, useState } from "react";

export default function useSpeechRecognition() {
  const { language } = useLanguage();
  const recognitionRef = useRef(null);

  const [isListening, setIsListening] =
    useState(false);

  const startListening = (onResult) => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = languages[language].speech;
    
    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.onstart = () =>
      setIsListening(true);

    recognition.onend = () =>
      setIsListening(false);

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      onResult(transcript);
    };

    recognition.start();

    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    startListening,
    stopListening,
    isListening,
  };
}