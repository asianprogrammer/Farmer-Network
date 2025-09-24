import React, { memo } from "react";
import { Link } from "react-router-dom";
import "@/assets/styles/UserCard.css";

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
            <Link to={`/u/${encodeURIComponent(user.id)}`} className="username-link">
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
        {user.canMessage ? (
          <Link className="btn btn--secondary" to={`/messages/compose?to=${encodeURIComponent(user.id)}`}>
            {/* Lucide message-circle */}
            <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
            </svg>
            Message
          </Link>
        ) : (
          <button className="btn btn--ghost" type="button" onClick={() => alert(`Followed ${user.name}!`)}>
            {/* Lucide user-plus */}
            <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" x2="19" y1="8" y2="14"></line>
              <line x1="22" x2="16" y1="11" y2="11"></line>
            </svg>
            Follow
          </button>
        )}
      </div>
    </article>
  );
}

const UserCard = memo(UserCardBase);
export default UserCard;