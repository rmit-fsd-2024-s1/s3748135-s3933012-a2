
import axios from "axios";

const API_HOST = "http://localhost:4000";

// Fetch all replies
async function fetchAllReplies() {
  const response = await axios.get(API_HOST + "/api/reply");
  return response.data;
}

// Create a new reply
async function createReply(reply) {
  const response = await axios.post(API_HOST + "/api/reply", reply);
  return response.data;
}

export {
  fetchAllReplies,
  createReply
};
