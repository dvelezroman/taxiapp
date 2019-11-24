import React from 'react';
import { connect } from 'react-redux';
import socketIO from 'socket.io-client';
import { StyleSheet, Dimensions, Modal, TouchableHighlight } from 'react-native';
import { View } from 'react-native';
import { Container, Header, Content, Button, Title, Right, Left, Body } from 'native-base';
import DriverLogic from './DriverLogic';
import { logout } from '../../redux/creators/user';
import MapComponent from '../Common/MapComponent';
import { URL_SERVER } from '../../../keys';
import SearchClient from './SearchClient';

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

	// connectSocket = () => {
	// 	this.socket = socketIO.connect(URL_SERVER);
	// 	this.socket.on('request_driver', ({ pointCoords, geocoded_waypoints }) => {
	// 		this.logic.getRouteDirection({ place_id: geocoded_waypoints[0].place_id });
	// 		this.setState({ travel: pointCoords });
	// 	});
	// };

	connectSocket = () => {
		this.socket = socketIO.connect(URL_SERVER);
		this.socket.emit('request_client');
	};

	componentDidMount() {
		this.socket.on('request_driver', clients => {
			console.log({ clients });
			this.setState({ clients });
		});
	}

	render() {
		const { pointCoords, clients, selectedClient } = this.state;
		console.log(this.state);
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
						{/* <Button block onPress={() => this.logic.requestPassengers(this.socket)}> */}
						<Button block onPress={() => this.setState({ modalVisible: true })}>
							<Title>Buscar Pasajeros</Title>
						</Button>
					</View>
					<MapComponent pointCoords={pointCoords} />
				</Content>

				<Modal animationType='slide' transparent={false} visible={this.state.modalVisible}>
					<View style={{ marginTop: 22 }}>
						<SearchClient
							clients={clients}
							onSelectClient={client => this.logic.onSelectClient(this.socket, client)}
						/>

						<View style={{ flex: 1, alignContent: 'center' }}>
							<Button
								style={{ justifyContent: 'center' }}
								onPress={() => {
									this.setState({ modalVisible: false });
								}}
							>
								<Title>Cancelar</Title>
							</Button>
						</View>
					</View>
				</Modal>
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
