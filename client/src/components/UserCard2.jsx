const UserCard2 = ({ user }) => {
    return (
      <div className="user-card">
        <div className="user-card__header">
          <img
            src={user.profilePicture}
            className="user-card__image"
            alt="Profile"
          />
          <div>
            <h2 className="user-card__name">
              {user.firstName} {user.lastName}
            </h2>
            <p className="user-card__email">{user.email}</p>
          </div>
        </div>
        <div className="user-card__details">
          <div className="user-card__detail">
            <strong>ID:</strong> {user._id}
          </div>
          <div className="user-card__detail">
            <strong>Mobile:</strong> {user.mobile}
          </div>
          <div className="user-card__detail">
            <strong>Status:</strong> {user.status}
          </div>
          <div className="user-card__detail">
            <strong>Gender:</strong> {user.gender}
          </div>
          <div className="user-card__detail">
            <strong>Location:</strong> {user.location}
          </div>
          <div className="user-card__detail">
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </div>
          <div className="user-card__detail">
            <strong>Updated At:</strong>{" "}
            {new Date(user.updatedAt).toLocaleString()}
          </div>
          <div className="user-card__detail">
            <strong>Role:</strong> {user.role}
          </div>
        </div>
      </div>
    );
  };
export default UserCard2