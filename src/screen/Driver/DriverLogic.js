import ROUTES from '../../router/Routes';
import LocationDAO from '../../business/daos/LocationDAO';

class DriverLogic {
	constructor(screen) {
		this.setState = screen.setState.bind(screen);
		screen.state = {
			fetching: false,
			pointCoords: [],
			travel: [],
			distance: null,
			duration: null,
			destination: null,
			geocoded_waypoints: []
		};
		this.state = screen.state;
		this.props = screen.props;
		this.requestPassengers = this.requestPassengers.bind(this);
	}

	logout = () => {
		this.props.logout();
		this.props.navigation.navigate(ROUTES.LOGIN);
	};

	getRouteDirection = async destination => {
		const { distance, duration, pointCoords } = await LocationDAO.getRouteDirection(destination);
		this.setState({ pointCoords, distance, duration });
	};

	requestPassengers(socket) {
		socket.emit('request_passenger');
	}
}

export default DriverLogic;
