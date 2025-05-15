import connectDB from '@/app/backend/config/db';
import User from '@/app/backend/models/User';

export async function POST(req) {
  await connectDB();

  const { name, email, password, role } = await req.json();

  // Validate required fields
  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ message: 'Name, email, and password are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists with that email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      role, // optional: defaults to 'user'
    });

    return new Response(
      JSON.stringify({
        message: 'Signup successful!',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Signup error:', err);
    return new Response(JSON.stringify({ message: 'Signup failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
