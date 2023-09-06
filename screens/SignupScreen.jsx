import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { replace } = useNavigation();

  // notification listeners
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const username = notification.request.content.data.username;
        console.log("NOTIFICATION RECEIVED: userName - ", username);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const verify = response.notification.request.content.data.verify;

        console.log("NOTIFICATION INTERACTED: verify - ", verify);
      });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
      await scheduleNotificationHandler(email);
      replace("Login", { verify: true });
    } catch (err) {
      Alert.alert(
        "Authentication Failed!",
        "Please check your credentials or try again later"
      );
      setIsAuthenticating(false);
    }
  }

  // Local Notification
  async function scheduleNotificationHandler(username) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Confirmation Code sent to your Inbox!",
        body: "Please enter the confirmation code to sign in!",
        data: { verify: true, username },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  // Push Notification (peer-to-peer)
  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "", // get the pushToken for the device to send the notification
        title: "Test - send from the device!",
        body: "This is a test!",
      }),
    });
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
