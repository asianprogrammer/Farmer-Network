import { NavLink } from "react-router-dom";

export default function Post(){
    return (
        <div className="post">
            <div className="user">
                <NavLink to="/user?{userid}">
                    <div className="profile">
                        <img src={profile} alt='{username} profile picture'  />
                    </div>
                    <div className="info">
                        <div className="name">{username}</div>
                        <div className="time">{time}</div>
                    </div>
                </NavLink>
                <div className="options">...</div>
            </div>
            <div className="content">
                <p>{content}</p>
                {image && <div className="image">
                    <img src={image} alt="Post image" />
                </div>}
            </div>
            
            <div className="interactions">
                <button>Like</button>
                <button>Comment</button>
                <button>Share</button>
            </div>
        </div>
    );
}