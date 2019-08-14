import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import store from './redux/Store';
import App from './screen/App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const EntryPoint = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <App />
      </Provider>
    </View>
  );
};

export default EntryPoint;
