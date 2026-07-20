# Maitri Circle waitlist: production setup

The Maitri homepage sends waitlist submissions to the private Vercel function at `/api/waitlist`. The function validates the request, keeps the shared credential server-side, and forwards valid entries to a Google Apps Script web app that owns duplicate checking and Sheet storage.

## Live resources

- Google Sheet: [maitri_waitlist_form](https://docs.google.com/spreadsheets/d/1rmEJKNXKh7NUQgpFlhtBCaUrtnvJbK4PC6zVIqsbXmo/edit)
- Exact tab name: `Waitlist`
- Columns: `Submitted At | Name | Email | Source`
- Apps Script source template: [`Code.gs`](./Code.gs)
- Vercel function: `09_demos/maitri-circle/api/waitlist.js`
- Production site: `https://maitricircle.vercel.app`

The Sheet is private. The Apps Script deployment executes as its owner and allows anonymous web-app requests, but rejects every request that does not contain the matching shared credential.

## Credential and deployment rules

Use one long random credential for Apps Script and Vercel. Never put its real value, the private Apps Script `/exec` URL, or a `.env.local` file in Git.

In Apps Script, replace only this placeholder before deploying:

```js
const SHARED_SECRET = '__REPLACE_WITH_THE_SINGLE_VERCEL_SECRET__';
```

Deploy the script as a **Web app** with:

- Execute as: **Me**
- Who has access: **Anyone**
- URL: the production `/exec` URL, never the `/dev` test URL

After a code change, use **Deploy → Manage deployments → Edit → New version**. Saving the editor alone does not update the live web app. The existing `/exec` URL remains stable when the deployment is updated.

## Vercel configuration

The Vercel project must use this Root Directory:

```txt
09_demos/maitri-circle
```

Configure both variables in Production, Preview, and Development:

```txt
MAITRI_WAITLIST_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
MAITRI_WAITLIST_WEBHOOK_SECRET=YOUR_LONG_RANDOM_SECRET
```

Keep both variables **Sensitive** in Production and Preview. Vercel does not support Sensitive variables in Development, so create separate Development-only entries with the same values and leave Sensitive disabled there. Redeploy after changing the Root Directory or environment variables.

Do not prefix either variable with `VITE_`; they must remain available only to the serverless function.

## Verification checklist

1. Open `https://maitricircle.vercel.app` and submit a clearly identified test name and email.
2. Confirm the page reports success only after the server returns `{ "ok": true }`.
3. Confirm exactly one matching row appears in the `Waitlist` tab.
4. Submit the same email again and confirm the page still succeeds without creating a second row.
5. Remove only the verification row after the duplicate check passes.

## Local development

`npm run dev` serves only the Vite frontend. Run `vercel dev` from `09_demos/maitri-circle` to exercise `/api/waitlist` locally, and create an uncommitted `.env.local` from `.env.example` with the two variables above.

## Operational behavior

- Name and email are normalized and validated at both the Vercel and Apps Script boundaries.
- The honeypot field is handled by the Vercel function before storage.
- Email duplicate checks are case-insensitive and protected by an Apps Script lock.
- Spreadsheet formula prefixes are escaped before storage.
- The tab name and header row are verified before writes; a mismatch fails closed.
- Logs contain processing stages and duplicate status, never names, emails, URLs, or credentials.
- GitHub Pages is not part of this waitlist deployment.

## Troubleshooting

- **`/api/waitlist` returns 404:** verify the Vercel Root Directory is exactly `09_demos/maitri-circle`, then redeploy.
- **“The waitlist is being connected”:** one or both Vercel variables are missing from the active deployment.
- **“We could not save your details”:** verify the `/exec` URL, anonymous Apps Script access, the matching credential, and the active Apps Script version.
- **No new row but the page succeeds:** search the Email column; duplicate emails intentionally return success without another row.
