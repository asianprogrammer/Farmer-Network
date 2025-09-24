import { useState } from "react";
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
 * @param {Array<string>} props.media  Array of URLs (images or videos)
 */
export default function Post({
  postId,
  username,
  profile,
  time,
  content = "",
  media = [],
  likes = 0,
  comments = 0,
  onLikeClick = () => {},
  onLikesView = () => {},
  onCommentsView = () => {},
}) {
  const formattedTime = time ? format(new Date(time)) : "just now";
  const [openIndex, setOpenIndex] = useState(-1); // -1 = closed

  // Convert media URLs into Lightbox slides
  const slides = media.map((url) => {
    const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
    return isVideo
      ? { type: "video", sources: [{ src: url, type: "video/mp4" }] }
      : { src: url };
  });

  return (
    <article className="post">
      {/* Header */}
      <header className="post-header flex FY-center F-space">
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

        <div className="options">
          <MoreIcon />
        </div>
      </header>

      <section className="post-main">
        {content && (
          <div className="content my-2">
            <p>{content}</p>
          </div>
        )}

        {/* Thumbnails (click opens lightbox) */}
        {media.length > 0 && (
          <div className="media-content flex FY-center flex-wrap gap-2 my-2">
            {media.map((url, index) => {
              const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
              return (
                <div
                  key={index}
                  className="media-item cursor-pointer"
                  onClick={() => setOpenIndex(index)}
                >
                  {isVideo ? (
                    // show muted thumbnail video (pointer-events-none so click goes to container)
                    <video
                      className="w-full rounded-md pointer-events-none"
                      src={url}
                      muted
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={url}
                      alt={`media-${index}`}
                      className="w-full rounded-md object-cover pointer-events-none"
                    />
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
            onClick={() => onLikeClick(postId)}
            className="like-btn flex F-center"
          >
            <HeartIcon stroke="#9AA1AD" /> &nbsp; <span>Like</span>
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
            <CommentIcon /> &nbsp; <span>Comment</span>
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
          maxZoomPixelRatio: 4, // how far user can zoom (4×)
          wheelZoomDistanceFactor: 100, // tweak sensitivity
        }}
      />
    </article>
  );
}
