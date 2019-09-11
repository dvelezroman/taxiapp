import Geolocation from '@react-native-community/geolocation';
import PolyLine from '@mapbox/polyline';
import { API_KEY } from '../../../keys';
import axios from 'axios';

APIS = {
	places: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input={searchPlace}&key=${API_KEY}`,
	direction: `https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&key=${API_KEY}`
};

class LocationDAORaw {
	constructor() {
		this.location = null;
	}

	getLocation() {
		return new Promise((resolve, reject) => {
			Geolocation.getCurrentPosition(
				position => {
					this.position = position;
					resolve({ status: true, position });
				},
				error => {
					this.position = null;
					reject({ status: false, position: null, error });
				},
				{
					enableHighAccuracy: false,
					timeout: 20000
				}
			);
		});
	}

	async searchPlaces(textToSearch) {
		let endpoint = APIS.places.replace('{searchPlace}', textToSearch);
		try {
			const { data } = await axios.get(endpoint);
			return data;
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getRouteDirection(destination) {
		const origin = this.position.coords;
		let endpoint = APIS.direction.replace('{origin}', `${origin.latitude},${origin.longitude}`);
		endpoint = endpoint.replace('{destination}', `place_id:${destination.place_id}`);
		try {
			const { data } = await axios.get(endpoint);
			console.log(data);
			const points = PolyLine.decode(data.routes[0].overview_polyline.points);
			const pointCoords = points.map(point => {
				return { latitude: point[0], longitude: point[1] };
			});
			return {
				distance: data.routes[0].legs[0].distance,
				duration: data.routes[0].legs[0].duration,
				pointCoords
			};
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default LocationDAO = new LocationDAORaw();
