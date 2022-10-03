import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import CustomeProps from '../utils/CustomProps';

export class DbStack extends cdk.Stack {

  public vendorTable: dynamodb.Table;

  constructor(scope: cdk.App, id: string, props?: CustomeProps) {
      super(scope, id, props);
      
    this.vendorTable = new dynamodb.Table(this, 'vendors', {
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
     partitionKey: {
       name: 'postcode', type: dynamodb.AttributeType.STRING
     },
     sortKey: {
       name: 'name', type: dynamodb.AttributeType.STRING
     },
   });
    
   this.vendorTable.addLocalSecondaryIndex({
      indexName: 'nameIndex',
      sortKey: { name: 'name', type: dynamodb.AttributeType.STRING },
    });
      
      //Grant access
      if(props && props.lambda) this.vendorTable.grantReadWriteData(props?.lambda)
  }
}