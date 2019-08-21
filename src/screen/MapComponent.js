import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View } from 'native-base';

const { height, width } = Dimensions.get('window');

const MapComponent = () => {
	console.log(`height: ${height}, width: ${width}`);
	return (
		<View>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={{
					width: width,
					height: height - 100
				}}
				region={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121
				}}
			/>
		</View>
	);
};

export default MapComponent;
