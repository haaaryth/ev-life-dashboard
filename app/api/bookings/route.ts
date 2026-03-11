import { NextRequest } from 'next/server';
import { getSessionUser, apiResponse, apiError } from '@/lib/auth';
import { getBookings, createBooking } from '@/lib/firestore';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return apiError('Unauthorized', 401);

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase();

  // Service centres only see their own bookings
  const centreFilter = user.role === 'servicecentre' ? user.centreName : undefined;
  let bookings = await getBookings(centreFilter) as any[];

  if (status) bookings = bookings.filter((b: any) => b.status === status);
  if (search) bookings = bookings.filter((b: any) =>
    b.userName?.toLowerCase().includes(search) ||
    b.service?.toLowerCase().includes(search) ||
    b.centre?.toLowerCase().includes(search) ||
    b.userEmail?.toLowerCase().includes(search)
  );

  return apiResponse(bookings);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return apiError('Unauthorized', 401);

  const body = await req.json();
  const { userName, userEmail, service, centre, date, time, amount } = body;
  if (!userName || !service || !centre || !date || !time) {
    return apiError('Missing required fields');
  }

  const id = await createBooking({
    userName, userEmail: userEmail || '',
    userId: `manual_${Date.now()}`,
    vehicleMake: body.vehicleMake || '—',
    vehicleModel: body.vehicleModel || '—',
    service, centre, date, time,
    amount: Number(amount) || 0,
    status: 'pending',
  });

  return apiResponse({ id, success: true }, 201);
}
