import { createAppContainer } from 'react-navigation';
import DataBase from '../business/DataBase';
import SwitchStack from '../router/stacks/SwitchStack';

const App = createAppContainer(SwitchStack);
DataBase.init();

export default App;
