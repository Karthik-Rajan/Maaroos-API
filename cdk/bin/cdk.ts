#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { WebAppStack } from "../lib/web-app-stack";
import { ApiStack } from "../lib/api-stack";
import { AuthStack } from "../lib/auth-stack";

const app = new cdk.App();

let WebStack = new WebAppStack(app, "web", {});

let authStack = new AuthStack(app, "auth", {});

let APIStack = new ApiStack(app, "api", {
  stage: "stage",
  userPoolArn: authStack,
});

// let DBStack = new DbStack(app, "db", {
//   lambda: APIStack.fetchPartnerLambda,
// });
