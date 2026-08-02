import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

initializeApp({
  credential: cert(serviceAccount),
});

const targetEmail = "batursadic@hotmail.com";

async function grantAdminRole() {
  try {
    const user = await getAuth().getUserByEmail(targetEmail);

    await getAuth().setCustomUserClaims(user.uid, {
      admin: true,
    });

    console.log(`✅ ${targetEmail} is now an admin.`);
  } catch (err) {
    console.error(err);
  }
}

grantAdminRole();