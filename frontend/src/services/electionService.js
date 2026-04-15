import api from "../utils/api";

export const getElections = async () => {
  const res = await api.get("/elections");
  return res.data;
};

export const getActiveElection = async () => {
  const res = await api.get("/elections/active");
  return res.data;
};

export const startElection = async (id) => {
  const res = await api.put(`/elections/activate/${id}`);
  return res.data;
};