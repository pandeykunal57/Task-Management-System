export async function POST(req) {
  const body = await req.json();

  // to Simulate user creation
  console.log("Signup attempt", body);

  return new Response(JSON.stringify({ message: "Signup successful!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
