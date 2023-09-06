import AsyncStorage from "@react-native-async-storage/async-storage";
import { default as NetInfo } from "@react-native-community/netinfo";
import {
  AWS_REGION,
  AWS_USER_POOLS_ID,
  AWS_USER_POOLS_WEB_CLIENT_ID,
  AWS_COGNITO_IDENTITY_POOL_ID,
} from "@env";

import { Amplify } from "aws-amplify";
// import awsExport from "../src/aws-exports";

Amplify.configure({
  aws_cognito_region: AWS_REGION,
  aws_user_pools_id: AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: AWS_USER_POOLS_WEB_CLIENT_ID,
  aws_cognito_identity_pool_id: AWS_COGNITO_IDENTITY_POOL_ID,
  // ...awsExport,
  // authenticationFlowType: "USER_PASSWORD_AUTH",
});
