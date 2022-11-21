#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { WebAppStack } from "../lib/web-app-stack";
import { ApiStack } from "../lib/api-stack";
// import { DbStack } from "../lib/db-stack";

const app = new cdk.App();

let WebStack = new WebAppStack(app, "web", {});

// let dbClient = new DbStack(app, "db", {});

let APIStack = new ApiStack(app, "api", {
  stage: "stage",
});

// let DBStack = new DbStack(app, "db", {
//   lambda: APIStack.fetchPartnerLambda,
// });
