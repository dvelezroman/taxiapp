import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import ROUTES from '../router/Routes';

const mapStateToParams = state => ({
  loggedUser: state.userReducer,
});

class VerifySession extends React.Component {
  componentDidMount() {
    this.verifySession();
  }

  verifySession = () => {
    const { navigation, loggedUser } = this.props;
    navigation.navigate(loggedUser.status ? ROUTES.APP : ROUTES.AUTH);
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(mapStateToParams)(VerifySession);
