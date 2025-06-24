export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/api/posts");

    if (!res.ok) {
      return new Response("Failed to fetch posts from backend", {
        status: 500,
      });
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching posts: ", error.message);
    return new Response("Internal server error", { status: 500 });
  }
}
