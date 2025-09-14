const axios = require("axios");

class ApiClient {
  constructor(baseURL = "https://restful-booker.herokuapp.com") {
    this.client = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async getAuthToken() {
    try {
      const response = await this.client.post("/auth", {
        username: "admin",
        password: "password123",
      });
      return response.data.token;
    } catch (error) {
      console.error("Failed to get auth token:", error.message);
      return null;
    }
  }

  createAuthHeaders(authType = "cookie", token = null) {
    if (authType === "cookie" && token) {
      return { Cookie: `token=${token}` };
    } else if (authType === "basic") {
      return { Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=" };
    }
    return {};
  }

  async post(endpoint, data, headers = {}) {
    try {
      const response = await this.client.post(endpoint, data, { headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || error.message,
        headers: error.response?.headers || {},
      };
    }
  }

  async get(endpoint, headers = {}) {
    try {
      const response = await this.client.get(endpoint, { headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || error.message,
        headers: error.response?.headers || {},
      };
    }
  }

  async put(endpoint, data, headers = {}) {
    try {
      const response = await this.client.put(endpoint, data, { headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || error.message,
        headers: error.response?.headers || {},
      };
    }
  }

  async delete(endpoint, headers = {}) {
    try {
      const response = await this.client.delete(endpoint, { headers });
      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || error.message,
        headers: error.response?.headers || {},
      };
    }
  }
}

module.exports = ApiClient;
