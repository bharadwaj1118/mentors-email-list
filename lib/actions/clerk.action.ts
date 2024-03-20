import { auth, clerkClient } from "@clerk/nextjs";

export async function getOathToken() {
  const { userId } = auth();

  if (!userId) {
    return "no user id found";
  }

  // Get the OAuth access token for the user
  const provider = "oauth_google";

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );

  console.log("the response from the clerk", clerkResponse);

  if (clerkClient === undefined || clerkResponse.length === 0) {
    return "no clerk client found";
  }

  const accessToken = clerkResponse[0].token;

  return accessToken;
}
