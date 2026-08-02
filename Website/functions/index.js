const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = onCall(async (request) => {
  // 1. Verify the user calling this function is logged in
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated", 
      "You must be logged in to manage roles."
    );
  }

  // 2. Verify the user calling this function is ALREADY an admin
  if (request.auth.token.admin !== true) {
    throw new HttpsError(
      "permission-denied", 
      "Only admins can assign new admin users."
    );
  }

  const { targetEmail } = request.data;

  try {
    // 3. Find the user by their email address
    const user = await admin.auth().getUserByEmail(targetEmail);

    // 4. Set the custom claim { admin: true } on their account
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    return {
      message: `Success! ${targetEmail} has been granted admin privileges.`
    };
  } catch (error) {
    throw new HttpsError("internal", error.message);
  }
});