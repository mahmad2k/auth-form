import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import { Colors } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { useAuthContext } from "../context/auth.context";

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  const { logout } = useAuthContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon='exit'
              size={24}
              color={tintColor}
              onPress={logout}
            />
          );
        },
      }}
    >
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;
