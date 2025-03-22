const UserCard = ({ user }) => (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p>Posts: {user.postCount}</p>
    </div>
  );
  
  export default UserCard;
  