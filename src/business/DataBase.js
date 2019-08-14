import { UserDAO } from './daos/UserDAO';

class DataBaseRaw {
	async init() {
		await UserDAO.init();
	}
}

const DataBase = new DataBaseRaw();

export default DataBase;
