import { NextRequest } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { getCentres } from '@/lib/firestore';
import { signToken, apiResponse, apiError, UserRole } from '@/lib/auth';

const ADMIN_EMAILS = ['admin@evlife.my'];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return apiError('Email and password required');

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // Determine role
    let role: UserRole = 'servicecentre';
    let centreName: string | undefined;
    let centreId: string | undefined;

    if (ADMIN_EMAILS.includes(email)) {
      role = 'admin';
    } else {
      // Check if this email matches a service centre
      const centres = await getCentres() as any[];
      const centre = centres.find((c: any) => c.adminEmail === email);
      if (centre) {
        centreName = centre.name;
        centreId = centre.id;
      }
    }

    const token = await signToken({ uid, email, role, centreName, centreId });

    const res = apiResponse({ success: true, role, centreName, centreId });
    res.headers.set('Set-Cookie',
      `evlife_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`
    );
    return res;
  } catch (e: any) {
    const msg = e.code === 'auth/invalid-credential' ? 'Wrong email or password' : 'Login failed';
    return apiError(msg, 401);
  }
}
