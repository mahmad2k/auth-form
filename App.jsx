import { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { PROJECT_ID } from "@env";

import "./util/amplify";
import AuthStack from "./navigators/AuthStack";
import AuthenticatedStack from "./navigators/AuthenticatedStack";
import AuthProvider, { useAuthContext } from "./context/auth.context";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <>
      <StatusBar style='light' />

      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const { authenticate } = useAuthContext();

  // Get stored token from storage
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authenticate(storedToken);
      }
      setIsTryingLogin(false);
      await SplashScreen.hideAsync();
    }

    fetchToken();
  }, []);

  // notification permissions
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        const { status: permissionStatus } =
          Notifications.requestPermissionsAsync();
        if (permissionStatus !== "granted") {
          Alert.alert(
            "Permission required",
            "Push notifications need extra permissions"
          );
          return;
        }
      }

      try {
        const pushTokenData = await Notifications.getExpoPushTokenAsync({
          projectId: PROJECT_ID,
        });
        console.log(pushTokenData);
      } catch (err) {
        console.log("pushTokenData", err);
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  if (isTryingLogin) {
    return null;
  }

  return <Navigation />;
}

function Navigation() {
  const { isAuthenticated } = useAuthContext();

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
