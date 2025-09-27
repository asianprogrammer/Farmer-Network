import { Link } from "react-router-dom";
import '@/assets/styles/Followers.css';
import { useState } from "react";

function Follower({ userid, userprofile, username, email, onFollow }) {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = (e) => {
        e.preventDefault();
        setIsFollowing((prev) => !prev);
        if (onFollow) onFollow(userid, !isFollowing);
    };

    return (
        <Link to={`/user?id=${userid}`} className='follower'>
            <section>
                <div className="profile">
                    <img src={userprofile} alt={username + " Profile"} />
                </div>
                <div className="info">
                    <div className="name">{username}</div>
                    <div className="username">{email}</div>
                </div>
            </section>
            <button onClick={handleFollowClick}>
                {isFollowing ? "Unfollow" : "Follow"}
            </button>
        </Link>
    );
}

export default Follower;