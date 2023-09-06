import { useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuthContext } from "../context/auth.context";
import { login, verifyLogin } from "../util/auth";

function LoginScreen({ route }) {
  const verify = route.params?.verify ?? false;
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [verficationCode, setVerificationCode] = useState(verify);

  const { authenticate } = useAuthContext();

  async function loginHandler({ email, password, code }) {
    setIsAuthenticating(true);
    try {
      if (code) {
        await verifyLogin(email, code);
      }
      const token = await login(email, password);
      authenticate(token);
    } catch (err) {
      if (err.message === "User is not confirmed.") {
        setVerificationCode(true);
      } else {
        Alert.alert(
          "Authentication Failed!",
          "Please check your credentials or try again later"
        );
      }
      setVerificationCode(false);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging in...' />;
  }

  return (
    <AuthContent
      isLogin
      verify={verficationCode}
      onAuthenticate={loginHandler}
    />
  );
}

export default LoginScreen;
