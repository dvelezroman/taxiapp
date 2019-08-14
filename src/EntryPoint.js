import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { StyleSheet, View } from 'react-native';
import App from './screen/App';

const EntryPoint = () => {
	return (
		<View style={styles.container}>
			<Provider store={store}>
				<App />
			</Provider>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});

export default EntryPoint;
