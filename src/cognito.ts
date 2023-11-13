import { CognitoUserPool } from "amazon-cognito-identity-js";
export const userPool = new CognitoUserPool({
  UserPoolId: "ap-south-1_LvcmnFyzf",
  ClientId: "24nl17jdb886ivnkb6qhmihr8l",
});
