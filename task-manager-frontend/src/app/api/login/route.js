export async function POST(req) {
  const body = await req.json();

  if (body.email === "test@example.com" && body.password === "123456") {
    const user = {
      email: "test@example.com",
      role: "admin", // 👈 this makes the user admin
    };

    return new Response(JSON.stringify({ message: "Login successful!", user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Invalid credentials" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
