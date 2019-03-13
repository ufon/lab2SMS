import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from "./src/screens/Home";
import SendMessage from "./src/screens/SendMessage";
const Routes = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Lab2SMS"
    }
  },
  SendMessage: {
    screen: SendMessage,
    navigationOptions: {
      title: "Send message"
    }
  }
});
export default createAppContainer(Routes);
