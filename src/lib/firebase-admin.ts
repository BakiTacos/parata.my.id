import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

// This is the service account object.
// We are pulling the values from the environment variables.
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Fix for newline characters
};

// Check if the app is already initialized to prevent errors in development
// during hot-reloads.
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export the initialized admin instance for use in other server-side files.
export { admin };