import { NextRequest } from 'next/server';
import { getSessionUser, apiResponse, apiError } from '@/lib/auth';
import { updateUser, deleteUser } from '@/lib/firestore';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const body = await req.json();
  await updateUser(params.id, body);
  return apiResponse({ success: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  await deleteUser(params.id);
  return apiResponse({ success: true });
}
