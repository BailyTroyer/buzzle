/* eslint-disable no-invalid-this */
/* Axios for REST */
import axios from 'axios';

export default class ConnectionClient {

  /**
   * @constructor
   * @description inits axios object
   */
  constructor() {

    this.connectionClientInstance = axios.create({
      baseURL: `https://api.buzzle.live`,
      timeout: 60000,
    });
  }

  async getRooms() {
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await this.connectionClientInstance.get(`/rooms`, config)
    console.log("DATA: ", response.data)

    return response.data;
  }


  async getSession() {
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await this.connectionClientInstance.get(`/session`, config)
    console.log("DATA: ", response.data)

    return response.data;
  }
}