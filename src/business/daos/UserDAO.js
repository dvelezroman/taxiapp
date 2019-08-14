import GenericDAO from './GenericDAO';
import Connection from '../../system/Connection';

const endpoints = {
  login: 'LOGIN',
};

class UserDAORaw extends GenericDAO {
  constructor() {
    super('user', 'id', endpoints);
    this.connection = Connection;
  }

  async login(data) {
    try {
      const response = await this.connection.post(endpoints.login, data);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const UserDAO = new UserDAORaw();

export default UserDAO;
