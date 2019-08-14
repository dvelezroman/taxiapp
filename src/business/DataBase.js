import UserDAO from './daos/UserDAO';

class DataBaseRaw {
  constructor() {
    this.dao = UserDAO;
  }

  async init() {
    try {
      await this.dao.init();
    } catch (error) {
      throw new Error(error);
    }
  }
}

const DataBase = new DataBaseRaw();

export default DataBase;
