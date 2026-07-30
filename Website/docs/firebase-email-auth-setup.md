# Firebase email verification and templates setup

Use this checklist after deploying the Reforged website so sign-up, provider login, profile-change emails, and the approved domain all work together.

## 1. Connect the approved domain

1. Open Firebase Console.
2. Select the `reforged-b8582` project.
3. Go to Authentication > Settings > Authorized domains.
4. Add the production domain approved in Natro, for example `reforged.com.tr` and `www.reforged.com.tr`.
5. In Natro DNS, point the website records to the hosting provider you use for the site.
6. If Firebase Hosting is the final host, run the Firebase Hosting custom domain flow and copy the exact TXT/A records Firebase gives you into Natro.
7. Wait for SSL provisioning to finish before testing email links.

## 2. Enable email/password and email verification

1. Go to Authentication > Sign-in method.
2. Enable Email/Password.
3. Keep Email link sign-in disabled unless you want passwordless login later.
4. The app now calls `sendEmailVerification(user)` after email/password sign-up.
5. Test with a new account and confirm the message arrives.

## 3. Enable Google, Facebook, and LinkedIn sign-up

1. Go to Authentication > Sign-in method.
2. Enable Google and select the public support email.
3. Enable Facebook and paste the Facebook App ID and App Secret from Meta Developers.
4. Add the Firebase OAuth redirect URI to Meta Developers.
5. For LinkedIn, create an OpenID Connect provider in Firebase with provider id `oidc.linkedin`.
6. Add LinkedIn client ID, client secret, issuer, callback URL, and scopes requested by Firebase.
7. Add each production domain to the provider app settings as an allowed redirect origin.

## 4. Edit Firebase auth email templates

1. Go to Authentication > Templates.
2. Open Email address verification.
3. Set sender name to `Reforged`.
4. Use a subject like `Verify your Reforged account`.
5. Use copy similar to:

```text
Welcome to Reforged.

Confirm this email so we can connect your athlete profile, injury record, program access, and portal updates to the right account.

Verify email: %LINK%
```

6. Open Password reset and update the tone to match Reforged.
7. Add the production domain as the action URL domain when Firebase asks.
8. Send a test email.

## 5. Profile-change confirmation emails

The app writes profile-change email requests into the Firestore `mail` collection with template name `profile-change-confirmation`.

To make those emails actually send:

1. Install the Firebase Extension `Trigger Email from Firestore`.
2. Set the collection path to `mail`.
3. Configure SMTP with Gmail, SendGrid, Mailgun, or another sender.
4. Add a template named `profile-change-confirmation`.
5. Include `changedFields` in the template body.
6. Test by editing user information from `/account/edit`.

Suggested template:

```text
Your Reforged account information was updated.

Changed fields: {{changedFields}}

If you did not make this change, reply to this email so the team can review your account.
```

## 6. Final test flow

1. Create a new account at `/signup`.
2. Confirm the verification email.
3. Log in from `/auth`.
4. Visit `/products` and `/blog` while still logged in.
5. Use the Dashboard button to enter `/portal/dashboard`.
6. Use the Store button to return to `/products`.
7. Edit information at `/account/edit` and confirm the profile-change email is queued.
