import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import HomeStack from './HomeStack';

import ROUTES from '../Routes';

const MainStack = createStackNavigator(
	{
		[ROUTES.HOME]: HomeStack
	},
	{ headerMode: 'none' }
);

export default MainStack;
