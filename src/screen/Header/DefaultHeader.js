import React from 'react';
import { Text } from 'react-native';
import { Header, Body, Right, Left, Title } from 'native-base';

const DefaultHeader = ({ title, righText, leftText, rcallback, lcallback }) => {
  return (
    <>
      <Header>
        <Left />
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          <Text>{righText}</Text>
        </Right>
      </Header>
    </>
  )
};

export default DefaultHeader;
