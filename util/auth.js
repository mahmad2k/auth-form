import { Auth } from "aws-amplify";

// https://ap-southeast-1.console.aws.amazon.com/cognito/v2/idp/user-pools/ap-southeast-1_sNGEDkPdH/sign-in?region=ap-southeast-1

export async function createUser(username, password) {
  const user = await Auth.signUp({
    username,
    password,
    autoSignIn: { enabled: true },
  });
  return user;
}

export async function login(username, password) {
  const { signInUserSession } = await Auth.signIn(username, password);
  return signInUserSession.idToken.jwtToken;
}

export async function verifyLogin(username, code) {
  const response = await Auth.confirmSignUp(username, code);
  return response;
}
