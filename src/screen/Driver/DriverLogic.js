import { Keyboard } from 'react-native';
import ROUTES from '../../router/Routes';
import LocationDAO from '../../business/daos/LocationDAO';

class DriverLogic {
	constructor(screen) {
		this.setState = screen.setState.bind(screen);
		screen.state = {
			text: null,
			fetching: false,
			predictions: [],
			pointCoords: [],
			distance: null,
			duration: null,
			destination: null
		};
		this.state = screen.state;
		this.props = screen.props;
		this.onChangeDestination = this.onChangeDestination.bind(screen);
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
		const { distance, duration, pointCoords } = await LocationDAO.getRouteDirection(destination);
		this.setState({ pointCoords, distance, duration });
	};
}

export default DriverLogic;
