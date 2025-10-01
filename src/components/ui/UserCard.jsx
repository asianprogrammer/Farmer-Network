import { memo } from "react";
import { Link } from "react-router-dom";
import "@/assets/styles/UserCard.css";
import UserPlusIcon from "../../assets/IconComponents/UserPlusIcon";
import UserIcon from "../../assets/IconComponents/UserIcon";

function UserCardBase({ user }) {
  return (
    <article className="user-card" role="listitem">
      <div className="user-card__left">
        <div className="avatar-wrap">
          <img className="avatar" src={user.avatar} alt={user.name} />
          {user.online && <span className="status-dot" aria-label="Online" />}
        </div>
      </div>

      <div className="user-card__body">
        <div className="name-row">
          <h3 className="username" title={user.name}>
            <Link to={`/user?id=${encodeURIComponent(user.id)}`} className="username-link">
              {user.name}
            </Link>
          </h3>
          {user.online && <span className="inline-dot" />}
        </div>

        <p className="bio" title={user.bio || "No bio available"}>
          {user.bio || "No bio available"}
        </p>

        <div className="meta-row">
          <span className="email" title={user.email}>{user.email}</span>
          <span className={`presence ${user.online ? "is-online" : "is-offline"}`}>
            {user.online ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="user-card__right">
        {user.unfollow ? (
          <button className="btn btn--ghost" type="button" onClick={() => alert(`Followed ${user.name}!`)}>
            {/* Lucide user-plus */}
            <UserIcon />
            Unfollow
          </button>
        ) : (
          <button className="btn btn--ghost" type="button" onClick={() => alert(`Followed ${user.name}!`)}>
            {/* Lucide user-plus */}
            <UserPlusIcon />
            Follow
          </button>
        )}
      </div>
    </article>
  );
}

const UserCard = memo(UserCardBase);
export default UserCard;