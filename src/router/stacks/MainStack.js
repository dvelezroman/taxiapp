import { createBottomTabNavigator } from 'react-navigation';

import HomeStack from './HomeStack';

import ROUTES from '../Routes';

const MainStack = createBottomTabNavigator({
  [ROUTES.HOME]: HomeStack,
});

export default MainStack;
