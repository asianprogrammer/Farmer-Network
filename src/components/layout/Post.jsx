import { NavLink } from "react-router-dom";
import { format } from "timeago.js";   // <-- import formatter
import "@/assets/styles/Post.css";

/**
 * Post component
 *
 * @param {object} props
 * @param {string|number|Date} props.time  A Date object, timestamp, or date string
 * ...other props remain the same
 */
export default function Post({
  postId,
  username,
  profile,
  time,
  content = "",
  image,
  video,
  likes = 0,
  comments = 0,
  onLikeClick = () => {},
  onLikesView = () => {},
  onCommentsView = () => {},
}) {
  // Convert time to a Date, then format with timeago.js
  const formattedTime = time ? format(new Date(time)) : "just now";

  return (
    <article className="post">
      {/* Header */}
      <header className="post-header flex items-center justify-between">
        <NavLink to={`/user/${username}`} className="flex items-center gap-2">
          <div className="profile w-10 h-10 rounded-full overflow-hidden">
            <img
              src={profile}
              alt={`${username}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="info">
            <div className="name font-semibold">{username}</div>
            <div className="time text-sm text-gray-500">{formattedTime}</div>
          </div>
        </NavLink>
        <div className="options">…</div>
      </header>

      {/* Content */}
      {content && (
        <div className="content my-2">
          <p>{content}</p>
        </div>
      )}

      {image && (
        <div className="media my-2">
          <img src={image} alt="Post content" className="rounded-md w-full" />
        </div>
      )}

      {video && (
        <div className="media my-2">
          <video controls className="w-full rounded-md">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Interactions */}
      <footer className="interactions flex gap-4 mt-3">
        <button
          type="button"
          onClick={() => onLikeClick(postId)}
          className="like-btn flex items-center gap-1"
        >
          Like
          <span
            className="likes-count cursor-pointer text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              onLikesView(postId);
            }}
          >
            ({likes})
          </span>
        </button>

        <button
          type="button"
          onClick={() => onCommentsView(postId)}
          className="comment-btn flex items-center gap-1"
        >
          Comment
          <span className="comments-count">({comments})</span>
        </button>
      </footer>
    </article>
  );
}