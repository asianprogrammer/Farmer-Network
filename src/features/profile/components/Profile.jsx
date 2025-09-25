import CameraIcon from "@/assets/IconComponents/CameraIcon";

function Profile({ data, changeProfile }) {
  const {
    profile,     // profile image URL
    name,
    gmail,
    username,
    followers,
    following,
    status,
  } = data || {};

  return (
    <section className="userDetails flex FY-center">
    
      {/* Profile Image */}
      <section>
        <div className="largeProfile">
          <img
            src={profile}
            alt={`${username || "user"}'s profile`}
          />
        </div>
        <button className="changeProfile"
          aria-label="Change Profile Picture"
          onClick={changeProfile}
        >
          <CameraIcon />
        </button>
      </section>

      {/* User Details */}
      <section className="user-details">
        <section className="main flex">
          <span className="name">{name}</span>
          <span className="gmail">{gmail}</span>
          <span className="username">{username}</span>
        </section>

        {/* Followers / Following / Status */}
        <section className="flex FY-center">
          <section className="followers">
            <div className="count">{followers}</div>
            <div className="text">Followers</div>
          </section>
          <section className="followers">
            <div className="count">{following}</div>
            <div className="text">Following</div>
          </section>
          <section className="followers">
            <div className={`status ${status ? "on" : "off"}`}></div>
            <div className="text">{status ? "Online" : "Offline"}</div>
          </section>
        </section>

      </section>
    </section>
  )
}

export default Profile;