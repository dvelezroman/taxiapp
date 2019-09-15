import ROUTES from '../../router/Routes';

class LoginLogic {
	constructor(screen) {
		this.setState = screen.setState.bind(screen);
		screen.state = {
			email: '',
			password: '',
			driver: false
		};
		this.state = screen.state;
		this.props = screen.props;
		this.verifySession = this.verifySession.bind(screen);
		this.props.setWorking(true);
	}

	verifySession() {
		const { navigation, loggedUser, setWorking } = this.props;
		setWorking(true);
		if (loggedUser.status) {
			navigation.navigate(this.state.driver ? ROUTES.DRIVER : ROUTES.PASSENGER);
		} else {
			navigation.navigate(ROUTES.AUTH);
		}
		setWorking(false);
	}

	onChange = (name, value) => {
		this.setState({ [name]: value });
	};

	handleLogin() {
		// sends the login action
		const { email, password } = this.state;
		this.props.login({ email, password });
		this.setState({ email: '', password: '' });
	}
}

export default LoginLogic;
