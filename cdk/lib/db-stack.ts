import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import CustomeProps from "../utils/CustomProps";
import * as rds from "@aws-cdk/aws-rds";
import * as ec2 from "@aws-cdk/aws-ec2";

export class DbStack extends cdk.Stack {
  public dbConnectionLambda: lambda.Function;

  constructor(scope: cdk.App, id: string, props?: CustomeProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "maaroos-db-vpc", {
      cidr: "172.31.0.0/16",
      natGateways: 1,
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: "maaroos-db-vpc-subnet-1",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: "maaroos-db-vpc-subnet-2",
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
          cidrMask: 24,
        },
        {
          name: "maaroos-db-vpc-subnet-3",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });

    // 👇 create RDS instance
    const dbInstance = new rds.DatabaseInstance(this, "maaroos-db", {
      vpc,
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0,
      }),
      storageType: rds.StorageType.GP2,
      credentials: rds.Credentials.fromUsername("admin", {
        password: cdk.SecretValue.unsafePlainText("630561Svg"),
      }),
      multiAz: false,
      allocatedStorage: 20,
      maxAllocatedStorage: 20,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      backupRetention: cdk.Duration.days(0),
      deleteAutomatedBackups: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      databaseName: "maaroos",
      publiclyAccessible: true,
    });

    // dbInstance.connections.allowFrom(ec2Instance, ec2.Port.tcp(5432));

    new cdk.CfnOutput(this, "dbEndpoint", {
      value: dbInstance.instanceEndpoint.hostname,
    });
  }
}
