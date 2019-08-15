import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Text } from 'react-native';
import { Spinner } from 'native-base';

const { height, width } = Dimensions.get('window');

const SpinnerComponent = ({ color }) => {
  return (
    <View
      style={{
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
      }}
    >
      <Spinner
        style={{
          position: 'absolute',
          top: height / 2 - 40,
          fontWeight: 'bold',
          color: '#00bbfe',
        }}
        color={color}
      />
      <Text
        style={{
          position: 'absolute',
          top: height / 2 + 20,
          fontWeight: 'bold',
          color: '#00bbfe',
        }}
      >
        Loading
      </Text>
    </View>
  );
};

SpinnerComponent.propTypes = {
  color: PropTypes.string.isRequired,
};

export default SpinnerComponent;
