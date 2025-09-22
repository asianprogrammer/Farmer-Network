import { Link } from "react-router-dom";
import '@/assets/styles/Followers.css';
import { useState } from "react";

function Follower({ userid, userprofile, username, mail, onFollow }) {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = (e) => {
        e.preventDefault();
        setIsFollowing((prev) => !prev);
        if (onFollow) onFollow(userid, !isFollowing);
    };

    return (
        <Link to={`/user?${userid}`} className='follower'>
            <section>
                <div className="profile">
                    <img src={userprofile} alt={username + " Profile"} />
                </div>
                <div className="info">
                    <div className="name">{username}</div>
                    <div className="username">{mail}</div>
                </div>
            </section>
            <button onClick={handleFollowClick}>
                {isFollowing ? "Unfollow" : "Follow"}
            </button>
        </Link>
    );
}

export default Follower;