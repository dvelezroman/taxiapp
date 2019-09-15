import { createStackNavigator } from 'react-navigation';

import ROUTES from '../Routes';

import PassengerScreen from '../../screen/Passenger/PassengerScreen';
import DriverScreen from '../../screen/Driver/DriverScreen';

const HomeStack = createStackNavigator(
	{
		[ROUTES.PASSENGER]: PassengerScreen,
		[ROUTES.DRIVER]: DriverScreen
	},
	{ headerMode: 'none' }
);

export default HomeStack;
