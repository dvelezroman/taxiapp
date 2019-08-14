import urls from './urls';
import rootPath from '../constants/system';

export default class Path {
	constructor() {
		this.root = rootPath;
	}
	static paths() {
		return urls;
	}

	static getPath(name) {
		return `${this.root}${urls[name]}`;
	}
}
