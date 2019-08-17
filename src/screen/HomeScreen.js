import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, Button, Title, Right, Left, Body } from 'native-base';
import { logout } from '../redux/creators/user';
import ROUTES from '../router/Routes';

const mapStateToProps = state => ({
  loggedUser: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
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
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Button onPress={() => this.logout()}>
            <Title>Log Out</Title>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
