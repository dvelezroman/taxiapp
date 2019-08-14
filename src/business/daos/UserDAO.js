import GenericDAO from './GenericDAO';
import Connection from '../../system/Connection';

const endpoints = {
	login: 'LOGIN'
};

class UserDAORaw extends GenericDAO {
	constructor() {
		super('user', 'id', endpoints);
	}

	async login(data) {
		const response = await Connection.post(endpoints.login, data);
	}
}

const UserDAO = new UserDAORaw();

export default UserDAO;
