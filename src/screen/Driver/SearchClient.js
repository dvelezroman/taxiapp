import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Title } from 'native-base';
import { TouchableHighlight } from 'react-native-gesture-handler';

const SearchClient = ({ clients, onSelectClient }) => {
	return (
		<ScrollView style={{ flexDirection: 'column' }}>
			{/* TODO: clients list */}
			{clients.map((client, index) => (
				<Button
					key={index}
					onPress={() => {
						onSelectClient(client);
					}}
					style={{
						justifyContent: 'center',
						marginHorizontal: 20,
						marginVertical: 20
					}}
				>
					<Title style={{ color: 'blue' }}>{`Cliente: ${client.clientId}`}</Title>
				</Button>
			))}
		</ScrollView>
	);
};

export default SearchClient;

const styles = StyleSheet.create({});
