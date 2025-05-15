import connectDB from '@/app/backend/config/db';
import { verifyToken } from '@/app/backend/middlewares/authMiddleware'; // ✅ adjust this
import AuditLog from '@/app/backend/models/auditLog.model';

export async function GET(req) {
  await connectDB();

  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = await verifyToken(token); // ⬅ Auth check

    if (user.role !== 'admin') {
      return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
    }

    const logs = await AuditLog.find().populate('user', 'email');
    return new Response(JSON.stringify({ logs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Audit Log API error:', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
