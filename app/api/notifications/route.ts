import { NextRequest } from 'next/server';
import { getSessionUser, apiResponse, apiError } from '@/lib/auth';
import { getNotifications, createNotification, updateNotification, deleteNotification } from '@/lib/firestore';

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const notifs = await getNotifications();
  return apiResponse(notifs);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const body = await req.json();
  if (!body.title || !body.message) return apiError('Title and message required');
  const id = await createNotification({ ...body, type: body.type || 'info' });
  return apiResponse({ id, success: true }, 201);
}

export async function PATCH(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const { id, ...data } = await req.json();
  await updateNotification(id, data);
  return apiResponse({ success: true });
}

export async function DELETE(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const { id } = await req.json();
  await deleteNotification(id);
  return apiResponse({ success: true });
}
