# TODO: Fix Deployment Issues for Signup/Login on Vercel

## Information Gathered
- The app runs locally without issues, but signup and login fail on Vercel deployment.
- Backend is deployed on Render (based on API URL in frontend/src/api/api.js), frontend on Vercel.
- API base URL is hardcoded in frontend/src/api/api.js: production points to "https://to-do-app-e81b.onrender.com/api".
- CORS in backend/index.js allows the Vercel frontend origin.
- Backend uses ES modules, MongoDB, JWT, bcrypt.
- No obvious code errors in auth routes, models, or frontend components.
- Possible causes: Incorrect API URL, missing environment variables on Render (MONGO_URI, JWT_SECRET), or backend not properly deployed/accessible on Render.

## Plan
- [x] Update frontend/src/api/api.js to use the provided Vercel backend URL.
- [x] Add vercel.json and build script to backend for Vercel deployment.
- [x] Backend is already deployed on Vercel at https://to-do-app-.vercel.app.
- [x] Fixed API endpoints in frontend to remove extra "/api" prefix.
- [ ] Ensure environment variables are set on the Vercel backend deployment: MONGO_URI, JWT_SECRET.
- [ ] Update CORS in backend/index.js if needed (currently allows Vercel origin, which is good).
- [ ] Test the deployment after changes.

## Dependent Files to Edit
- frontend/src/api/api.js: Change API_BASE to use import.meta.env.VITE_API_BASE.
- backend/index.js: No changes needed unless CORS requires adjustment.

## Followup Steps
- Deploy backend on Vercel.
- Set VITE_API_BASE in Vercel frontend environment to the new backend URL.
- Verify environment variables are set on Vercel backend.
- Test signup and login on deployed app.
