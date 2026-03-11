import { NextRequest } from 'next/server';
import { getSessionUser, apiResponse, apiError } from '@/lib/auth';
import { updateCentre, deleteCentre } from '@/lib/firestore';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return apiError('Unauthorized', 401);
  // Service centres can update their own profile
  const body = await req.json();
  await updateCentre(params.id, body);
  return apiResponse({ success: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  await deleteCentre(params.id);
  return apiResponse({ success: true });
}
