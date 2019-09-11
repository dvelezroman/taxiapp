import { createStackNavigator } from 'react-navigation';

import ROUTES from '../Routes';

import PassengerScreen from '../../screen/Passenger/PassengerScreen';

const HomeStack = createStackNavigator(
	{
		[ROUTES.APP]: PassengerScreen
	},
	{ headerMode: 'none' }
);

export default HomeStack;
