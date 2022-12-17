import * as aws from "aws-sdk";

export const handler = async (event: any, context: any, callback: any) => {
  const challengeAnswer = Math.random().toString(10).substr(2, 6);
  const phoneNumber = event.request.userAttributes.phone_number;
  //   const sns = new aws.SNS();
  //   sns.publish(
  //     {
  //       Message:
  //         "[MAAROOS] " +
  //         challengeAnswer +
  //         " is OTP to login to your Maaroos Account. It is valid upto 24 hours.",
  //       PhoneNumber: phoneNumber,
  //       MessageStructure: "string",
  //       MessageAttributes: {
  //         "AWS.SNS.SMS.SenderID": {
  //           DataType: "String",
  //           StringValue: "AMPLIFY",
  //         },
  //         "AWS.SNS.SMS.SMSType": {
  //           DataType: "String",
  //           StringValue: "Transactional",
  //         },
  //       },
  //     },
  //     function (err, data) {
  //       if (err) {
  //         console.log(err.stack);
  //         console.log(data);
  //         return;
  //       }
  //       return data;
  //     }
  //   );
  event.response = {};
  event.response.privateChallengeParameters = {};
  event.response.privateChallengeParameters.answer = challengeAnswer;
  event.response.challengeMetadata = "CUSTOM_CHALLENGE";
  callback(null, event);
};
