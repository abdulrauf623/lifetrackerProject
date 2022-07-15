const axios = require("axios");

class APIClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = `rate_my_token_setup`
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token)
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }
    try {
      const res = await axios({ url, method, data, headers });

      
      return {data : res.data, error: null}
    } catch (error) {
      const message = error?.response?.data?.error?.message


      return {data : null, error : message || String(error)}
    }
  }


  async fetchPostFromToken(){
    const user = await this.fetchUserFromToken()
    console.log("User fetched from token", user)
    const id = user.data.user.id
    const result = await this.request({endpoint : `exercise/${id}`, method : `GET`})
    console.log("Result here", result)
    return result
  }


  async fetchUserFromToken(){
    const result =  await this.request({endpoint : `author/me`, method : `GET`})

    console.log("fetch user?", result)

    return result
  }

  async createPost(post) {
    return await this.request({endpoint : `exercise`, method : `POST`, data: post})
  }


  async loginUser(credentials){
    return await this.request({endpoint : `author/login`, method : `POST`, data : credentials})
  }

  async signUpUser(credentials){
    return await this.request({endpoint : `author/register`, method : `POST`, data : credentials})
  }

  async logOutUser(){
    this.setToken(null)
    localStorage.setItem(this.tokenName, "")
  }
}

module.exports = new APIClient(
  process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);
