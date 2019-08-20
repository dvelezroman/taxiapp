import React from 'react';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Header, Content, Button, Title, Right, Left, Body, View } from 'native-base';
import { logout } from '../redux/creators/user';
import ROUTES from '../router/Routes';

const mapStateToProps = state => ({
	loggedUser: state.userReducer
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

class HomeScreen extends React.Component {
	logout = () => {
		this.props.logout();
		this.props.navigation.navigate(ROUTES.LOGIN);
	};

	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => this.logout()}>
							<Title>Back</Title>
						</Button>
					</Left>
					<Body>
						<Title>Home</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<View style={{ height: 400, width: 400, justifyContent: 'center', alignItems: 'center' }}>
						<MapView
							provider={PROVIDER_GOOGLE}
							region={{
								latitude: 37.78825,
								longitude: -122.4324,
								latitudeDelta: 0.015,
								longitudeDelta: 0.0121
							}}
						/>
					</View>
				</Content>
			</Container>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);
