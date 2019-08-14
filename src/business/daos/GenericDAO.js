import axios from 'axios';

export default class GenericDAO {
  constructor(name, pk, endpoints) {
    this.list = [];
    this.name = name;
    this.pk = pk;
    this.endpoints = endpoints;
  }

  async init() {
    await this.findAll();
  }

  async findAll(data = {}) {
    try {
      this.list = [];
    } catch (error) {
      throw new Error(error);
    }
  }
}
