export const handler = async (event: any, context: any, callback: any) => {
  const challengeAnswer = Math.random().toString(10).substr(2, 6);
  const phoneNumber = event.request.userAttributes.phone_number;
  event.response = {};
  event.response.privateChallengeParameters = {};
  event.response.privateChallengeParameters.answer = challengeAnswer;
  event.response.challengeMetadata = "CUSTOM_CHALLENGE";
  callback(null, event);
};
