import { createSwitchNavigator } from 'react-navigation';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

import ROUTES from '../Routes';

const SwitchStack = createSwitchNavigator({
  [ROUTES.AUTH]: AuthStack,
  [ROUTES.APP]: MainStack,
});

export default SwitchStack;
