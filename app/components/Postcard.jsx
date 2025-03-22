const PostCard = ({ post }) => (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p>{post.body}</p>
      <p className="text-gray-600">Comments: {post.commentCount}</p>
    </div>
  );
  
  export default PostCard;
  