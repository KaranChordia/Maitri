# Maitri Circle waitlist: Vercel + Google Sheets setup

This is the free production setup for the Maitri homepage waitlist. Visitors provide only their name and email address. The website sends that information to Maitri's private Vercel API route, which validates it and stores it through Google Apps Script.

## What is already prepared

- [Maitri Circle Waitlist Google Sheet](https://docs.google.com/spreadsheets/d/1Z8V7NnF2oDk6Zf1Kq2C4EVRBr_LM2YXlly6d2BAFCrQ/edit)
- Sheet columns: `Submitted At | Name | Email | Source`
- Apps Script receiver: [`Code.gs`](./Code.gs)
- Private Vercel API route: `09_demos/maitri-circle/api/waitlist.js`
- Homepage validation, bot honeypot, duplicate-email handling, timeout, and visible success/failure states

## Values you will need

Prepare one long random secret, for example a password-manager-generated string of at least 32 characters. The exact same secret must be used in Apps Script and Vercel.

```txt
MAITRI_WAITLIST_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
MAITRI_WAITLIST_WEBHOOK_SECRET=YOUR_LONG_RANDOM_SECRET
```

These are server-side Vercel environment variables. Do not prefix either name with `VITE_`.

## Step 1: deploy the Google Apps Script receiver

1. Open the [Maitri Circle Waitlist Google Sheet](https://docs.google.com/spreadsheets/d/1Z8V7NnF2oDk6Zf1Kq2C4EVRBr_LM2YXlly6d2BAFCrQ/edit).
2. Choose **Extensions → Apps Script**.
3. Delete the sample function in the editor.
4. Copy everything from [`Code.gs`](./Code.gs) and paste it into the Apps Script editor.
5. Replace this placeholder in the first lines:

   ```js
   const SHARED_SECRET = 'REPLACE_WITH_THE_SAME_LONG_RANDOM_SECRET_USED_IN_VERCEL';
   ```

   Use your long random secret between the quote marks.
6. Click **Save** and name the project `Maitri Circle Waitlist`.
7. Click **Deploy → New deployment**.
8. Next to **Select type**, choose **Web app**.
9. Use these settings:
   - Description: `Maitri website waitlist`
   - Execute as: **Me**
   - Who has access: **Anyone**
10. Click **Deploy**, approve Google's permission prompts, and copy the Web app URL ending in `/exec`. Do not use the `/dev` test URL.

The Sheet itself can remain private. Only the web-app receiver requires **Anyone** access, and it rejects requests without the shared secret.

## Step 2: add the private variables in Vercel

1. Open the Maitri project in Vercel.
2. Choose **Settings → Environment Variables**.
3. Create `MAITRI_WAITLIST_WEBHOOK_URL` and paste the Apps Script `/exec` URL.
4. Create `MAITRI_WAITLIST_WEBHOOK_SECRET` and paste the exact secret used in `Code.gs`.
5. Apply both variables to **Production**, **Preview**, and **Development** unless you intentionally want separate test storage.
6. Save the variables.
7. Open **Deployments**, select the latest Maitri deployment, and choose **Redeploy** so the new variables become available to the serverless function.

The Apps Script URL and secret stay inside Vercel. They are never included in the public Vite JavaScript bundle.

## Step 3: test the live form

1. Open the deployed Maitri homepage.
2. Submit a test name and email in the Maitri Circle waitlist.
3. Confirm the page says: `You are on the Maitri Circle early list. We have saved your details.`
4. Open the Google Sheet and confirm the new row appears in the `Waitlist` tab.
5. Submit the same email again. The page should still succeed, but the Sheet should not create a duplicate row.

## Local development

Ordinary `npm run dev` serves the Vite frontend but does not run Vercel serverless functions. Use `vercel dev` from `09_demos/maitri-circle` when you need to test the complete form locally.

For local Vercel testing, create `.env.local` from `.env.example` and add:

```txt
MAITRI_WAITLIST_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
MAITRI_WAITLIST_WEBHOOK_SECRET=YOUR_LONG_RANDOM_SECRET
```

Never commit `.env.local`.

## Normal operation

- Each email is stored once. Repeat submissions return success without adding duplicate rows.
- Keep the first row and the tab name `Waitlist` unchanged.
- Do not publish the Apps Script URL or shared secret in frontend code.
- To stop collection immediately, archive the Apps Script deployment or remove either Vercel environment variable and redeploy.

## Updating Apps Script later

1. Edit and save `Code.gs` in Apps Script.
2. Choose **Deploy → Manage deployments**.
3. Edit the web-app deployment and select **New version**.
4. Deploy again. The existing `/exec` URL remains the same.

## Troubleshooting

- **“The waitlist is being connected”**: one or both Vercel variables are missing. Add them and redeploy.
- **“We could not save your details”**: verify the `/exec` URL, confirm Apps Script access is **Anyone**, and ensure the two secret values match exactly.
- **No row but the page reports success**: search the Email column first; duplicate emails intentionally do not create new rows.
- **Changed Apps Script code has no effect**: deploy a new Apps Script version; saving alone does not update the live web app.
- **Environment variables were added but the form still fails**: redeploy the Vercel project after saving the variables.
