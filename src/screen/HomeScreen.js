import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, Button, Title, Right, Left, Body, View } from 'native-base';
import { logout } from '../redux/creators/user';
import ROUTES from '../router/Routes';
import MapComponent from './MapComponent';

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
					<MapComponent />
				</Content>
			</Container>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);
