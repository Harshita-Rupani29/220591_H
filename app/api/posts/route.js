export async function GET(req) {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");
  const postId = pathSegments[pathSegments.length - 1];

  // Posts Data
  const posts = [
    { id: 1, content: "Post 1", comments: 150 },
    { id: 2, content: "Post 2", comments: 200 },
    { id: 3, content: "Post 3", comments: 180 },
    { id: 4, content: "Post 4", comments: 200 },
    { id: 5, content: "Post 5", comments: 100 }
  ];

  // Comments Data
  const comments = [
    { id: 3893, postid: 150, content: "Old comment" },
    { id: 4791, postid: 150, content: "Boring comment" },
    { id: 5002, postid: 161, content: "Interesting insight" },
    { id: 6003, postid: 246, content: "Great post!" }
  ];

  if (!isNaN(postId)) {
    const postComments = comments.filter(comment => comment.postid == postId);
    return new Response(JSON.stringify({ comments: postComments }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } else {
    const maxComments = Math.max(...posts.map((post) => post.comments));
    const trendingPosts = posts.filter((post) => post.comments === maxComments);
    return new Response(JSON.stringify(trendingPosts), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
}
