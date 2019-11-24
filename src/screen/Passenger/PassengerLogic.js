import { Keyboard } from 'react-native';
import ROUTES from '../../router/Routes';
import LocationDAO from '../../business/daos/LocationDAO';

class PassengerLogic {
	constructor(screen) {
		this.setState = screen.setState.bind(screen);
		screen.state = {
			text: null,
			fetching: false,
			predictions: [],
			pointCoords: [],
			distance: null,
			duration: null,
			destination: null,
			geocoded_waypoints: [],
			requesting_driver: false,
			driverIsOnTheWay: false,
			driverLocation: null
		};
		this.state = screen.state;
		this.props = screen.props;
		this.onChangeDestination = this.onChangeDestination.bind(screen);
		this.requestDriver = this.requestDriver.bind(screen);
	}

	logout = () => {
		this.props.logout();
		this.props.navigation.navigate(ROUTES.LOGIN);
	};

	onSelectDestination = destination => {
		this.setState({ destination, text: destination.description, predictions: [] });
		this.getRouteDirection(destination);
		Keyboard.dismiss();
	};

	onChangeDestination = async text => {
		this.setState({ text });
		const { predictions, status } = await LocationDAO.searchPlaces(text);
		this.setState({ predictions });
	};

	getRouteDirection = async destination => {
		const {
			distance,
			duration,
			pointCoords,
			geocoded_waypoints
		} = await LocationDAO.getRouteDirection(destination);
		this.setState({ pointCoords, distance, duration, geocoded_waypoints });
	};

	requestDriver(socket) {
		this.setState({ requesting_driver: true });
		const { pointCoords, geocoded_waypoints } = this.state;
		socket.emit('request_driver', { pointCoords, geocoded_waypoints });
	}
}

export default PassengerLogic;
