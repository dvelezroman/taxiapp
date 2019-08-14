import { createStackNavigator } from 'react-navigation';

import ROUTES from '../Routes';

import HomeScreen from '../../screen/HomeScreen';

const HomeStack = createStackNavigator(
  {
    [ROUTES.APP]: HomeScreen,
  },
  { headerMode: 'none' }
);

export default HomeStack;
