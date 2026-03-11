import { getSessionUser, apiResponse, apiError } from '@/lib/auth';
import { getDashboardStats } from '@/lib/firestore';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return apiError('Unauthorized', 401);
  const centreFilter = user.role === 'servicecentre' ? user.centreName : undefined;
  const stats = await getDashboardStats(centreFilter);
  return apiResponse(stats);
}
