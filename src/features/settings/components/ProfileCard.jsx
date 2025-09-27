import "../styles/common.css";
import "../styles/ProfileDetails.css";
import CameraIcon from "@/assets/IconComponents/CameraIcon";

export default function ProfileCard({ data, onChangePhoto }) {
  const {
    profile,
    name,
    email,
    username,
    followers = 0,
    following = 0,
    status = true,
  } = data || {};

  return (
    <section className="card card-padding">
      <div className="header-block">
        <div className="profile-photo-wrap">
          <div className="largeProfile">
            <img src={profile} alt={`${username || "user"}'s profile`} />
          </div>
          <button
            className="changeProfile"
            aria-label="Change Profile Picture"
            onClick={onChangePhoto}
            type="button"
          >
            <CameraIcon />
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <h2 className="h2">{name || "—"}</h2>
          <p className="gray">{email || "—"}</p>
          <div className="username">@{username || "user"}</div>

          <div className="user-details mt-24">
            <div className="status-container">
              <div className="followers">
                <div className="count" style={{ color: "#3b82f6", fontWeight: 800 }}>{followers}</div>
                <div className="text">Followers</div>
              </div>
              <div className="followers">
                <div className="count" style={{ color: "#10b981", fontWeight: 800 }}>{following}</div>
                <div className="text">Following</div>
              </div>
              <div className="followers">
                <div className={`status ${status ? "green" : "gray"}`}>●</div>
                <div className="text">{status ? "Online" : "Offline"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}