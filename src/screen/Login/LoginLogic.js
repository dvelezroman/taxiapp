class LoginLogic {
  constructor(screen) {
    this.setState = screen.setState.bind(screen);
    screen.state = {
      email: '',
      password: '',
    };
    this.state = screen.state;
    this.props = screen.props;
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleLogin() {
    // sends the login action
    const { email, password } = this.state;
    this.props.login({ email, password });
    this.setState({ email: '', password: '' })
  }
}

export default LoginLogic;
