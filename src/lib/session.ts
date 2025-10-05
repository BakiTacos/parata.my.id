import 'server-only'; // Ensures this code only runs on the server
import { cookies } from 'next/headers';
import { admin } from '../lib/firebase-admin'; // Your initialized Firebase Admin SDK
import { DecodedIdToken } from 'firebase-admin/auth';
import { redirect } from 'next/navigation';

export async function getVerifiedSession(): Promise<DecodedIdToken | null> {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    // Verify the session cookie. This will throw an error if it's invalid.
    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie, true);
    return decodedToken;
  } catch (error) {
    // Session cookie is invalid.
    return null;
  }
}

// A wrapper function to protect a page
export async function protectPage() {
    const session = await getVerifiedSession();

    if (!session) {
        redirect('/ausso/login');
    }

    // Also verify the user is an admin
    if (session.admin !== true) {
        // Redirect non-admins away, maybe with an error message
        redirect('/ausso/login?error=unauthorized');
    }

    return session;
}