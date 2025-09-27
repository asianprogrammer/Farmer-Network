import { NavLink } from "react-router-dom";
import Camera from "@/components/icons/Camera";
import MapPin from "@/components/icons/MapPin";
import Calendar from "@/components/icons/Calendar";
import "@/assets/styles/Profile.css";

/**
 * Props:
 *  - user: { id, username, name, avatarUrl, coverUrl, location, joinedAt, followers, following }
 *  - isOwner: boolean
 */
export default function ProfileHeader({ user, isOwner }) {
  const joinedText = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleString()
    : "";

  return (
    <section className="profile-header">
      <div className="cover-wrap">
        {user?.coverUrl ? (
          <img className="cover" src={user.coverUrl} alt="profile cover" />
        ) : (
          <div className="cover cover-fallback" />
        )}

        {isOwner && (
          <NavLink to="/profile" className="cover-edit btn-ghost" aria-label="Edit cover">
            <Camera />
            <span>Edit Cover</span>
          </NavLink>
        )}
      </div>

      <div className="header-main">
        <div className="avatar-wrap">
          <img
            className="avatar object-cover"
            src={user?.avatarUrl}
            alt={`${user?.username} avatar`}
          />
          {isOwner && (
            <NavLink
              to="/profile"
              className="avatar-edit btn-circle"
              aria-label="Edit profile photo"
              title="Edit profile photo"
            >
              <Camera />
            </NavLink>
          )}
        </div>

        <div className="header-right">
          <div className="title-row">
            <div>
              <h1 className="profile-name">{user?.name || user?.username}</h1>
              <div className="profile-handle">@{user?.username}</div>
            </div>

            {isOwner && (
              <NavLink to="/profile" className="btn-outline" aria-label="Edit profile">
                Edit Profile
              </NavLink>
            )}
          </div>

          <div className="meta-row">
            <div className="meta-item flex FY-center gap-1">
              <MapPin />
              <span className="muted">{user?.location || "—"}</span>
            </div>
            <div className="meta-item flex FY-center gap-1">
              <Calendar />
              <span className="muted">Joined {joinedText}</span>
            </div>
          </div>

          <div className="stats-row">
            <button className="stat-btn" type="button">
              <span className="bold">{user?.following ?? 0}</span>
              <span className="muted"> Following</span>
            </button>
            <button className="stat-btn" type="button">
              <span className="bold">{user?.followers ?? 0}</span>
              <span className="muted"> Followers</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}