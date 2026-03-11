import { apiResponse } from '@/lib/auth';

export async function POST() {
  const res = apiResponse({ success: true });
  res.headers.set('Set-Cookie',
    'evlife_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'
  );
  return res;
}
