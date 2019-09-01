import React from 'react';
import { Dimensions, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Toast } from 'native-base';

const { height, width } = Dimensions.get('window');

class MapComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: 0,
			longitude: 0,
			error: null
		};
	}

	async requestPermission() {
		try {
			const grantedPermissions = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
			]);
			console.log(grantedPermissions);
			if (
				grantedPermissions['android.permission.ACCESS_COARSE_LOCATION'] ===
					PermissionsAndroid.RESULTS.GRANTED &&
				grantedPermissions['android.permission.ACCESS_FINE_LOCATION'] ===
					PermissionsAndroid.RESULTS.GRANTED
			) {
				console.log('You can use the Location');
			} else {
				console.log('GPS Permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	}

	async componentWillMount() {
		await this.requestPermission();
	}

	componentDidMount() {
		Geolocation.getCurrentPosition(
			position => {
				const { coords } = position;
				this.setState({ latitude: coords.latitude, longitude: coords.longitude });
			},
			error => {
				this.setState({ error });
			},
			{
				enableHighAccuracy: false,
				timeout: 20000
			}
		);
	}

	render() {
		console.log(this.state);
		const { latitude, longitude } = this.state;
		return (
			<View>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={{
						width: width,
						height: height - 100
					}}
					region={{
						latitude,
						longitude,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121
					}}
				/>
			</View>
		);
	}
}

export default MapComponent;
