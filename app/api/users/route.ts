import { NextRequest } from 'next/server';
import { getSessionUser, apiResponse, apiError } from '@/lib/auth';
import { getUsers, createUser } from '@/lib/firestore';

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const users = await getUsers();
  return apiResponse(users);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const body = await req.json();
  if (!body.name || !body.email) return apiError('Name and email required');
  const id = await createUser({ ...body, status: 'active', vehicles: 0 });
  return apiResponse({ id, success: true }, 201);
}
