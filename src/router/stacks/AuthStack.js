import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../../screen/Login/LoginScreen';

import ROUTES from '../Routes';

const AuthStack = createStackNavigator(
  {
    [ROUTES.LOGIN]: LoginScreen,
  },
  {
    headerMode: 'none',
  }
);

export default AuthStack;
