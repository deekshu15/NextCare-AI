import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoiceInputButton from "../components/voice/VoiceInputButton";
import { motion } from "framer-motion";
import {
  FaMicrophone,
  FaStopCircle,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";

import { createAssessment } from "../services/assessmentService";

const symptomOptions = [
  "Fever",
  "Headache",
  "Cold",
  "Cough",
  "Body Pain",
  "Sore Throat",
  "Vomiting",
  "Diarrhea",
  "Chest Pain",
  "Breathing Difficulty",
];

const painLevels = [
  {
    label: "Low",
    value: 3,
    activeClass: "bg-green-500 border-green-500 text-white shadow-lg",
  },
  {
    label: "Medium",
    value: 6,
    activeClass: "bg-yellow-500 border-yellow-500 text-white shadow-lg",
  },
  {
    label: "High",
    value: 9,
    activeClass: "bg-red-500 border-red-500 text-white shadow-lg",
  },
];

function Assessment() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null); 

  const [form, setForm] = useState({
    symptoms: "",
    duration: "",
    pain_level: 6,
    medical_history: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addSymptom = (symptom) => {
    if (form.symptoms.includes(symptom)) return;

    setForm({
      ...form,
      symptoms:
        form.symptoms === ""
          ? symptom
          : `${form.symptoms}, ${symptom}`,
    });
  };
  const startVoiceRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  const recognitionInstance = new SpeechRecognition();

  recognitionInstance.lang = "en-US";
  recognitionInstance.continuous = false;
  recognitionInstance.interimResults = false;

  recognitionInstance.onstart = () => {
    setIsListening(true);
  };

  recognitionInstance.onend = () => {
    setIsListening(false);
  };

  recognitionInstance.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setForm((prev) => ({
      ...prev,
      medical_history:
        prev.medical_history === ""
          ? transcript
          : prev.medical_history + " " + transcript,
    }));
  };

  recognitionInstance.start();

  setRecognition(recognitionInstance);
};

const stopVoiceRecognition = () => {
  if (recognition) {
    recognition.stop();
  }
};

  const submitAssessment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await createAssessment(form);

      navigate(`/result/${result.id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Assessment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="New Health Assessment"
        subtitle="Describe your symptoms for AI-powered analysis"
      />

      <motion.form
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submitAssessment}
      >
        <Card>
          <h2 className="text-2xl font-bold mb-6">
            Quick Symptoms
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">
            {symptomOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => addSymptom(item)}
                className="px-5 py-2 rounded-full bg-blue-100 hover:bg-blue-600 hover:text-white transition"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="space-y-7">
            <div>
              <div className="flex justify-between items-center">
                <label className="font-semibold">
                  Symptoms
                </label>
              </div>

              <textarea
                rows={5}
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe all symptoms..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-semibold">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="Example: 3 Days"
                  className="w-full mt-2 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-4">
                  Pain Level
                </label>

                <div className="flex gap-4 flex-wrap">
                  {painLevels.map((level) => (
                    <button
                      key={level.label}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          pain_level: level.value,
                        })
                      }
                      className={`px-8 py-3 rounded-full border-2 font-semibold transition-all duration-300
                        ${
                          form.pain_level === level.value
                            ? level.activeClass
                            : "bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                        }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>

              <div className="flex justify-between items-center mb-3">

                {!isListening ? (

                  <button
                    type="button"
                    onClick={startVoiceRecognition}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
                  >
                    <FaMicrophone />
                    Voice Assistant
                </button>

                ) : (

                <button
                  type="button"
                  onClick={stopVoiceRecognition}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full animate-pulse"
                >
                  <FaStopCircle />
                  Stop
                </button>

                )}

              </div>

           <textarea
              rows={5}
              name="medical_history"
              value={form.medical_history}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
              placeholder="Mention previous illnesses, allergies, surgeries..."
          />

          {isListening && (

            <div className="flex items-center gap-3 mt-3 text-red-600 font-semibold">

              <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>

                Listening...

              </div>

            )}

        </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl py-4 text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? "Analyzing Symptoms..."
                : "Analyze Symptoms"}
            </button>
          </div>
        </Card>
      </motion.form>
    </DashboardLayout>
  );
}

export default Assessment;