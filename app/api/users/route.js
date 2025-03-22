export async function GET() {
    const users = [
      { id: 1, name: "John Doe", postCount: 45 },
      { id: 2, name: "Helly Moore", postCount: 32 },
      { id: 3, name: "Olivia Lewis", postCount: 27 },
      { id: 4, name: "Diana", postCount: 50 },
      { id: 5, name: "Jane Doe", postCount: 19 },
      { id: 6, name: "Rachel Young", postCount: 33 },
      { id: 7, name: "Bob Johnspn", postCount: 21 }
    ];
  
    const sortedUsers = users.sort((a, b) => b.postCount - a.postCount);
  
    return new Response(JSON.stringify(sortedUsers), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  }
  