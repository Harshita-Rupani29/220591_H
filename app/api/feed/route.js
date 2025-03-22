export async function GET(req) { 
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();

  const posts = [
    { id: 246, userid: 1, content: "Post about ant", timestamp: "2025-03-20T09:30:00Z" },
    { id: 161, userid: 1, content: "Post about elephant", timestamp: "2025-03-20T10:30:00Z" },
    { id: 300, userid: 2, content: "Post about cars", timestamp: "2025-03-20T11:30:00Z" },
    { id: 400, userid: 2, content: "Post about travel", timestamp: "2025-03-20T12:30:00Z" }
  ];

  if (!isNaN(userId)) {
    const userPosts = posts
      .filter(post => post.userid == userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return new Response(JSON.stringify({ posts: userPosts }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } else {
    const sortedPosts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return new Response(JSON.stringify(sortedPosts), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
}
