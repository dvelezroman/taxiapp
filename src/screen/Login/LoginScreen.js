import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, ImageBackground } from 'react-native';
import {
	Container,
	Header,
	Content,
	Body,
	Title,
	Right,
	Left,
	Text,
	Input,
	Button,
	Grid,
	Row,
	Item
} from 'native-base';
import LoginLogic from './LoginLogic';
import { login } from '../../redux/creators';
import GenericScreen from '../../HOC/GenericScreen';

class LoginScreenRaw extends React.Component {
	constructor(props) {
		super(props);
		this.logic = new LoginLogic(this);
		this.logic.handleLogin.bind(this);
	}

	componentDidMount() {
		const { setWorking } = this.props;
		setWorking(false);
	}

	componentDidUpdate(prevProps) {
		const { loggedUser } = this.props;
		if (loggedUser.status !== prevProps.loggedUser.status) {
			this.logic.verifySession();
		}
	}

	render() {
		const { email, password } = this.state;
		// const logo = require('../../../assets/blockfi_login.png');
		// const bg = require('../../../assets/bg2x.png');
		return (
			<Container>
				<Header>
					<Left />
					<Body>
						<Title>Login</Title>
					</Body>
					<Right>
						<Text>Register</Text>
					</Right>
				</Header>
				{/* <ImageBackground style={{ flex: 1, height: '100%', width: '100%' }} source={bg}> */}
				<Content>
					{/* <Image style={{ height: 300, width: null, flex: 1 }} source={logo} /> */}
					<Grid style={{ paddingHorizontal: 20 }}>
						<Row style={{ flexDirection: 'column', justifyContent: 'center' }}>
							<Item regular style={{ marginVertical: 10, borderRadius: 5, height: 45 }}>
								<Input
									placeholder='email'
									placeholderTextColor='#d0d0d0'
									style={{ color: 'white' }}
									value={email}
									onChangeText={value => {
										this.logic.onChange('email', value);
									}}
								/>
							</Item>
							<Item regular style={{ marginVertical: 10, borderRadius: 5, height: 45 }}>
								<Input
									secureTextEntry
									placeholder='password'
									placeholderTextColor='#d0d0d0'
									style={{ color: 'white' }}
									value={password}
									onChangeText={value => {
										this.logic.onChange('password', value);
									}}
								/>
							</Item>
						</Row>
					</Grid>
					<Button
						block
						onPress={() => this.logic.handleLogin()}
						style={{ marginHorizontal: 20, marginVertical: 10, backgroundColor: '#37D3E9' }}
					>
						<Title style={{ color: 'white' }}>Login</Title>
					</Button>
				</Content>

				{/* </ImageBackground> */}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	loggedUser: state.userReducer
});

const mapDispatchToProps = dispatch => ({
	login: values => dispatch(login(values))
});

LoginScreenRaw.propTypes = {
	loggedUser: PropTypes.shape({
		status: PropTypes.bool,
		token: PropTypes.string,
		user: PropTypes.shape({
			email: PropTypes.string,
			password: PropTypes.string
		})
	}).isRequired,
	setWorking: PropTypes.func.isRequired
};

const LoginScreen = GenericScreen(LoginScreenRaw);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);
