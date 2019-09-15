import React from 'react';
import { connect } from 'react-redux';
import socketIO from 'socket.io-client';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from 'react-native';
import { Container, Header, Content, Button, Title, Right, Left, Body } from 'native-base';
import DriverLogic from './DriverLogic';
import { logout } from '../../redux/creators/user';
import MapComponent from '../Common/MapComponent';
import { URL_SERVER } from '../../../keys';

const { height, width } = Dimensions.get('window');

const mapStateToProps = state => ({
	loggedUser: state.userReducer
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

class DriverScreen extends React.Component {
	constructor(props) {
		super(props);
		this.logic = new DriverLogic(this);
		this.connectSocket();
	}

	connectSocket = () => {
		this.socket = socketIO.connect(URL_SERVER);
		this.socket.on('request_driver', ({ pointCoords, geocoded_waypoints }) => {
			this.logic.getRouteDirection({ place_id: geocoded_waypoints[0].place_id });
			this.setState({ travel: pointCoords });
		});
	};

	render() {
		const { pointCoords } = this.state;
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => this.logic.logout()}>
							<Title>Back</Title>
						</Button>
					</Left>
					<Body>
						<Title>Driver</Title>
					</Body>
					<Right />
				</Header>
				<Content scrollEnabled={false}>
					<View style={styles.buttonItem}>
						<Button block onPress={() => this.logic.requestPassengers(this.socket)}>
							<Title>Buscar Pasajeros</Title>
						</Button>
					</View>
					<MapComponent pointCoords={pointCoords} />
				</Content>
			</Container>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DriverScreen);

const styles = StyleSheet.create({
	buttonItem: {
		position: 'absolute',
		backgroundColor: '#fafafa',
		width: width - 40,
		marginTop: height - 150,
		alignSelf: 'center',
		marginHorizontal: 10,
		zIndex: 10
	}
});
