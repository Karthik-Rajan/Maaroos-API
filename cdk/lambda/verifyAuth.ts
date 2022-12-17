export const handler = async (event: any, context: any) => {
  if (
    event.request.privateChallengeParameters.answer ===
    event.request.challengeAnswer
  ) {
    //event.response.autoConfirmUser = true;
    event.response.answerCorrect = true;
  } else {
    //event.response.autoConfirmUser = false;
    event.response.answerCorrect = false;
  }
  context.done(null, event);
};
