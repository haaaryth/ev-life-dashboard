import { NextRequest } from 'next/server';
import { getSessionUser, apiResponse, apiError } from '@/lib/auth';
import { getStations, createStation } from '@/lib/firestore';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return apiError('Unauthorized', 401);
  const stations = await getStations();
  return apiResponse(stations);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') return apiError('Forbidden', 403);
  const body = await req.json();
  if (!body.name || !body.location) return apiError('Name and location required');
  const id = await createStation(body);
  return apiResponse({ id, success: true }, 201);
}
