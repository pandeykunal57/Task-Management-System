export async function POST(req) {
  const body = await req.json();

  // to  Simulate authentication
  console.log("Login attempt", body);

  if (body.email === "test@example.com" && body.password === "123456") {
    return new Response(JSON.stringify({ message: "Login successful!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Invalid credentials" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
