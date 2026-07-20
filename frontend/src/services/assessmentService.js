import api from "./api";

export const createAssessment = async (assessmentData) => {
  const response = await api.post(
    "/assessment/analyze",
    assessmentData
  );

  return response.data;
};

export const getAssessment = async (id) => {
  const response = await api.get(
    `/assessment/${id}`
  );

  return response.data;
};

export const getAssessmentHistory = async () => {
  const response = await api.get(
    "/assessment/history"
  );

  return response.data;
};