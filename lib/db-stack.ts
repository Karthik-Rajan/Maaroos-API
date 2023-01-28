import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import CustomeProps from "../utils/CustomProps";
import * as rds from "@aws-cdk/aws-rds";
import * as ec2 from "@aws-cdk/aws-ec2";

export class DbStack extends cdk.Stack {
  public dbConnectionLambda: lambda.Function;

  constructor(scope: cdk.App, id: string, props?: CustomeProps) {
    super(scope, id, props);

    // const vpc = new ec2.Vpc(this, "maaroos-db-vpc", {
    //   cidr: "172.31.0.0/16",
    // });

    // const securityGroups = new ec2.SecurityGroup(this, "maaroos-db-sg", {
    //   vpc: vpc,
    // });

    // 👇 create RDS instance
    // const dbInstance = new rds.DatabaseInstance(this, "maaroos-db", {
    //   vpc,
    //   engine: rds.DatabaseInstanceEngine.mysql({
    //     version: rds.MysqlEngineVersion.VER_8_0,
    //   }),
    //   storageType: rds.StorageType.GP2,
    //   credentials: rds.Credentials.fromUsername("admin", {
    //     password: cdk.SecretValue.unsafePlainText("630561Svg"),
    //   }),
    //   instanceType: ec2.InstanceType.of(
    //     //Free Tire
    //     ec2.InstanceClass.T3,
    //     ec2.InstanceSize.MICRO
    //   ),
    //   securityGroups: [],
    //   multiAz: false,
    //   allocatedStorage: 20,
    //   allowMajorVersionUpgrade: false,
    //   autoMinorVersionUpgrade: true,
    //   backupRetention: cdk.Duration.days(0),
    //   deleteAutomatedBackups: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   deletionProtection: false,
    //   databaseName: "maaroos",
    //   publiclyAccessible: true,
    // });

    // dbInstance.connections.allowFrom(ec2Instance, ec2.Port.tcp(5432));

    // new cdk.CfnOutput(this, "dbEndpoint", {
    //   value: dbInstance.instanceEndpoint.hostname,
    // });
  }
}
