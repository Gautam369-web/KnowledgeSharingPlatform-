# Vercel Deployment Guide

Since your project is now split into `frontend` and `backend`, you need to deploy them as **two separate projects** in Vercel from the same repository.

## 1. Deploying the Backend
1. Go to Vercel Dashboard -> **New Project**.
2. Select your repository.
3. **Important**: In the "Root Directory" setting, click **Edit** and select the `/backend` folder.
4. **Environment Variables**: Add all variables from your `backend/.env` (MONGODB_URI, EMAIL_SERVER_*, etc.).
5. Click **Deploy**.
6. Once deployed, copy your backend URL (e.g., `https://knowledge-backend.vercel.app`).

## 2. Deploying the Frontend
1. Go to Vercel Dashboard -> **New Project**.
2. Select the **same repository**.
3. **Important**: In the "Root Directory" setting, click **Edit** and select the `/frontend` folder.
4. **Environment Variables**:
   - Add any variables from `frontend/.env.local`.
   - Update your API URL variable to point to your **new backend URL**.
5. Click **Deploy**.

## 3. Important Notes
- **CORS**: Ensure your backend allows requests from your frontend URL. I have already included `cors()` in your `server.js`.
- **Serverless**: Vercel hosts Node apps as serverless functions. Your `server.js` will work perfectly thanks to the `vercel.json` I added!
