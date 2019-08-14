import axios from 'axios';
import Path from './Path';

export default class Connection {
	constructor() {}

	static get = endPoint => axios.get(Path.getPath(endPoint));

	static post = (endPoint, body) => axios.post(Path.getPath(endPoint), body);
}
