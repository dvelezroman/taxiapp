import UserDAO from './daos/UserDAO';

class DataBaseRaw {
	constructor() {
		this.init();
	}

	async init() {
		try {
			await UserDAO.init();
		} catch (error) {
			throw new Error(error);
		}
	}
}

const DataBase = new DataBaseRaw();

export default DataBase;
