import React from 'react';
import { Dimensions, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import LocationDAO from '../../business/daos/LocationDAO';
import { View } from 'native-base';

import { API_KEY } from '../../../keys';

const { height, width } = Dimensions.get('window');

class MapComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: 0,
			longitude: 0,
			error: null,
			pointCoords: []
		};
	}

	async requestPermission() {
		try {
			await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
			]);
		} catch (err) {
			console.warn(err);
		}
	}

	async componentDidMount() {
		const { pointCoords } = this.props;
		await this.requestPermission();
		LocationDAO.getLocation()
			.then(({ status, position }) => {
				this.setState({
					pointCoords,
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			})
			.catch(response => {
				console.log('Location error....');
				throw new Error(response.error);
			});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.pointCoords.length !== prevState.pointCoords.length) {
			return { pointCoords: nextProps.pointCoords };
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.pointCoords.length !== prevProps.pointCoords.length) {
			this.map.fitToCoordinates(this.props.pointCoords);
		}
	}

	render() {
		const { latitude, longitude, pointCoords } = this.state;
		const marker = pointCoords.length ? (
			<Marker coordinate={pointCoords[pointCoords.length - 1]} title='Destino' />
		) : null;
		return (
			<View>
				<MapView
					ref={map => {
						this.map = map;
					}}
					provider={PROVIDER_GOOGLE}
					style={{
						width: width,
						height: height
					}}
					region={{
						latitude,
						longitude,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121
					}}
					showsUserLocation={true}
				>
					{marker}
					<Polyline coordinates={pointCoords} strokeColor='red' strokeWidth={2} />
				</MapView>
			</View>
		);
	}
}

export default MapComponent;
