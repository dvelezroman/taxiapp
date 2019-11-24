import { createStackNavigator } from 'react-navigation';

import ROUTES from '../Routes';

import PassengerScreen from '../../screen/Passenger/PassengerScreen';
import DriverScreen from '../../screen/Driver/DriverScreen';
import SearchClient from '../../screen/Driver/SearchClient';

const DriverStack = createStackNavigator(
	{
		[ROUTES.DRIVER]: DriverScreen,
		[ROUTES.SEARCH_CLIENT]: SearchClient
	},
	{ headerMode: 'none' }
);

const PassengerStack = createStackNavigator(
	{
		[ROUTES.PASSENGER]: PassengerScreen
	},
	{ headerMode: 'none' }
);

const HomeStack = createStackNavigator(
	{
		[ROUTES.PASSENGER]: PassengerStack,
		[ROUTES.DRIVER]: DriverStack
	},
	{ headerMode: 'none' }
);

export default HomeStack;
