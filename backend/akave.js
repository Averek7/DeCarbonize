const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000';

async function apiRequest(method, endpoint, data = null) {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Throw for better handling
  }
}

module.exports = apiRequest;
