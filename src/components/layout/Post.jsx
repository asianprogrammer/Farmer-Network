import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { format } from "timeago.js";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import "@/assets/styles/Post.css";
import "@/assets/styles/ZoomInOutOff.css";

import HeartIcon from "@/assets/IconComponents/Love";
import CommentIcon from "@/assets/IconComponents/Comment";
import MoreIcon from "@/assets/IconComponents/More";

/**
 * Post component
 *
 * @param {Array<string>} props.media  Array of URLs (images or videos)
 */

export default function Post({
  postId,
  username,
  profile,
  time,
  content = "",
  media = [],
  likes: initialLikes = 0, // Renamed to initialLikes
  comments = 0,
  onLikeClick: onParentLikeClick = () => {}, // Renamed for clarity
  onLikesView = () => {},
  onCommentsView = () => {},
  isLiked: initialIsLiked = false, // Renamed to initialIsLiked
}) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [openIndex, setOpenIndex] = useState(-1);

  const formattedTime = useMemo(
    () => (time ? format(new Date(time)) : "just now"),
    [time]
  );

  const slides = useMemo(
    () =>
      media.map((url) => {
        const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
        return isVideo
          ? { type: "video", sources: [{ src: url, type: "video/mp4" }] }
          : { src: url };
      }),
    [media]
  );

  const handleLikeToggle = () => {
    // Optimistic UI Update
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikes((prevLikes) => (newIsLiked ? prevLikes + 1 : prevLikes - 1));

    // Notify parent component about the change and pass the new status
    onParentLikeClick(postId, newIsLiked);
  };

  return (
    <article className="post">
      {/* Header */}
      <header className="post-header flex FY-center F-space">
        <NavLink to={`/user/${username}`} className="flex profile-container">
          <div className="profile">
            <img
              src={profile}
              alt={`${username}'s profile`}
              className="object-cover"
            />
          </div>
          <div className="info">
            <div className="name">{username}</div>
            <div className="time">{formattedTime}</div>
          </div>
        </NavLink>

        <div className="options flex F-center">
          <MoreIcon />
        </div>
      </header>

      <section className="post-main">
        {content && (
          <div className="content">
            <p>{content}</p>
          </div>
        )}

        {/* Thumbnails (click opens lightbox) */}
        {media.length > 0 && (
          <div className="media-content flex FY-center">
            {media.map((url, index) => {
              const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
              return (
                <div
                  key={index}
                  className="media-item cursor-pointer"
                  onClick={() => setOpenIndex(index)}
                >
                  {isVideo ? (
                    <video
                      src={url}
                      muted
                      controls
                      preload="metadata"
                      className="media-video"
                    />
                  ) : (
                    <img src={url} alt={`media-${index}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Interactions */}
        <footer className="interactions flex gap-4 mt-3">
          <button
            type="button"
            onClick={handleLikeToggle}
            className={`like-btn flex F-center ${isLiked ? "liked" : ""}`}
          >
            <HeartIcon /> <span>Like</span>
            {likes > 0 && (
              <span
                className="likes-count"
                onClick={(e) => {
                  e.stopPropagation();
                  onLikesView(postId);
                }}
              >
                ({likes})
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onCommentsView(postId)}
            className="comment-btn flex F-center"
          >
            <CommentIcon /> <span>Comment</span>
            {comments > 0 && (
              <span
                className="comments-count"
                onClick={(e) => {
                  e.stopPropagation();
                  onCommentsView(postId);
                }}
              >
                ({comments})
              </span>
            )}
          </button>
        </footer>
      </section>

      {/* Lightbox: only uses slides from this post */}
      <Lightbox
        open={openIndex >= 0}
        index={openIndex}
        close={() => setOpenIndex(-1)}
        slides={slides}
        plugins={[Video, Zoom]}
        zoom={{
          maxZoomPixelRatio: 4,
          wheelZoomDistanceFactor: 100,
        }}
      />
    </article>
  );
}