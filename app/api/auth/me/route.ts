import { getSessionUser, apiResponse, apiError } from '@/lib/auth';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return apiError('Unauthorized', 401);
  return apiResponse(user);
}
