import ROUTES from '../../router/Routes';
import LocationDAO from '../../business/daos/LocationDAO';

class DriverLogic {
	constructor(screen) {
		this.setState = screen.setState.bind(screen);
		screen.state = {
			location: {
				latitude: null,
				longitude: null
			},
			fetching: false,
			pointCoords: [],
			travel: [],
			distance: null,
			duration: null,
			destination: null,
			geocoded_waypoints: [],
			selectedClient: null,
			modalVisible: false,
			clients: []
		};
		this.state = screen.state;
		this.props = screen.props;
		this.requestPassengers = this.requestPassengers.bind(this);
		this.onSelectClient = this.onSelectClient.bind(this);
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
		this.setState({ modalVisible: true });
	}

	onSelectClient(socket, client) {
		let location = {};
		LocationDAO.getLocation()
			.then(({ status, position }) => {
				location['latitude'] = position.coords.latitude;
				location['longitude'] = position.coords.longitude;
				socket.emit('accept_client', { client, location });
			})
			.catch(error => {
				console.log(error);
			});
		this.getRouteDirection({ place_id: client.data.geocoded_waypoints[0].place_id });
		this.setState({
			selectedClient: client,
			modalVisible: false,
			clients: [],
			travel: client.data.pointCoords,
			location
		});
	}
}

export default DriverLogic;
