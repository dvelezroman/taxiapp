import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { View, ActivityIndicator } from 'react-native';
import {
	Container,
	Header,
	Content,
	Button,
	Title,
	Right,
	Left,
	Body,
	Input,
	Grid,
	Row,
	Text,
	Icon
} from 'native-base';
import PassengerLogic from './PassengerLogic';
const socketIO = require('socket.io-client');
import { URL_SERVER } from '../../../keys';
import { logout } from '../../redux/creators/user';
import MapComponent from '../Common/MapComponent';

const { height, width } = Dimensions.get('window');

const mapStateToProps = state => ({
	loggedUser: state.userReducer
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

class PassengerScreen extends React.Component {
	constructor(props) {
		super(props);
		this.logic = new PassengerLogic(this);
		this.connectSocket();
	}

	connectSocket = () => {
		this.socket = socketIO.connect(URL_SERVER);
		this.socket.on('accepted_trip', location => {
			this.setState({ requesting_driver: false, driverIsOnTheWay: true, driverLocation: location });
		});
	};

	render() {
		const {
			text,
			predictions,
			pointCoords,
			distance,
			duration,
			driverIsOnTheWay,
			driverLocation
		} = this.state;
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => this.logic.logout()}>
							<Title>Back</Title>
						</Button>
					</Left>
					<Body>
						<Title style={{ alignSelf: 'center' }}>Client</Title>
					</Body>
					<Right />
				</Header>
				<Content scrollEnabled={false}>
					<View style={styles.destinationItem}>
						<Input
							style={styles.input}
							placeholderTextColor={'#c0c0c0'}
							placeholder='A donde vamos?'
							value={text}
							onChangeText={value => {
								this.logic.onChangeDestination(value);
							}}
						/>
						{predictions.map(prediction => (
							<Button
								key={prediction.id}
								transparent
								onPress={() => this.logic.onSelectDestination(prediction)}
							>
								<Title style={styles.prediction}>{prediction.description}</Title>
							</Button>
						))}
					</View>
					{pointCoords.length > 0 && (
						<View style={styles.summaryItem}>
							<Grid>
								<Row>
									<Title style={{ color: 'black' }}>Estadisticas del Viaje</Title>
								</Row>
								<Row>
									<Text>{`Distancia: ${distance && distance.text}`}</Text>
								</Row>
								<Row>
									<Text>{`Tiempo: ${duration && duration.text}`}</Text>
								</Row>
								<Row>
									<Text>{`Valor: $ 1.50`}</Text>
								</Row>
							</Grid>
						</View>
					)}
					{pointCoords.length > 0 && (
						<View style={styles.buttonItem}>
							<Button block onPress={() => this.logic.requestDriver(this.socket)}>
								<Title>Solicitar Conductor</Title>
							</Button>
						</View>
					)}
					<MapComponent
						pointCoords={pointCoords}
						driverIsOnTheWay={driverIsOnTheWay}
						driverLocation={driverLocation}
					/>
				</Content>
			</Container>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PassengerScreen);

const styles = StyleSheet.create({
	destinationItem: {
		position: 'absolute',
		backgroundColor: '#fafafa',
		width: width - 40,
		marginTop: 20,
		alignSelf: 'center',
		marginHorizontal: 10,
		paddingHorizontal: 10,
		zIndex: 10
	},
	summaryItem: {
		position: 'absolute',
		backgroundColor: '#fafafa',
		width: width - 40,
		marginTop: 80,
		alignSelf: 'center',
		marginHorizontal: 10,
		paddingHorizontal: 10,
		zIndex: 10
	},
	prediction: {
		color: '#000000',
		fontSize: 16,
		height: 40
	},
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
