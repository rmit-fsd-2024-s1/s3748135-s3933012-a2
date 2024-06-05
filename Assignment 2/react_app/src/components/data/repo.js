import axios from "axios";

const API_HOST = "http://localhost:4000";

async function verifyUser(email, password) {
    const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
    const user = response.data;
        
    return user;
  }


async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}
async function updateUser(email, user) {
  const response = await axios.put(API_HOST + `/api/users/${email}`, user);
  return response.data;
}

// New function to delete a user by email
async function deleteUser(email) {
  const response = await axios.delete(API_HOST + `/api/users/${email}`);
  return response.data;
}

export{
    verifyUser,
    findUser, 
    createUser,
    updateUser,
    deleteUser
}
