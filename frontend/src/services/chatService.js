import api from "./api";

export const askQuestion = async (assessmentId, question) => {
  const response = await api.post("/chat/ask", {
    assessment_id: assessmentId,
    question,
  });

  return response.data;
};

export const getChatHistory = async (assessmentId) => {
  const response = await api.get(
    `/chat/history/${assessmentId}`
  );

  return response.data;
};