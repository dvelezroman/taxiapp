import React from 'react';
import { View, Text } from 'react-native';

class HomeScreen extends React.Component {
  componentDidMount() {
    console.log('Home');
  }

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
