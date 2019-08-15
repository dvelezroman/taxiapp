import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    opacity: 0.9,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    top: height / 2 - 40,
    fontWeight: 'bold',
    color: '#00bbfe',
  },
  text: {
    position: 'absolute',
    top: height / 2 + 20,
    fontWeight: 'bold',
    color: '#00bbfe',
  },
});

const SpinnerComponent = ({ color }) => {
  return (
    <View style={styles.container}>
      <Spinner style={styles.spinner} color={color} />
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

SpinnerComponent.propTypes = {
  color: PropTypes.string.isRequired,
};

export default SpinnerComponent;
