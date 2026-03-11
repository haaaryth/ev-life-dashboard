import { NextRequest } from 'next/server';
import { getSessionUser, apiResponse, apiError } from '@/lib/auth';
import { getCentres, createCentre } from '@/lib/firestore';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return apiError('Unauthorized', 401);
  const centres = await getCentres();
  return apiResponse(centres);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const body = await req.json();
  if (!body.name || !body.location) return apiError('Name and location required');
  const id = await createCentre(body);
  return apiResponse({ id, success: true }, 201);
}
