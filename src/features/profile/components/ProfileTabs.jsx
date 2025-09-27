import { useMemo, useState } from "react";
import GridIcon from "@/assets/IconComponents/Grid";
import CameraIcon from "@/assets/IconComponents/CameraIcon";
import "../styles/Profile.css";

/**
 * Props:
 *  - posts: Array<Post>
 *  - renderPost: (post) => ReactNode
 */
export default function ProfileTabs({ posts = [], renderPost }) {
  const [tab, setTab] = useState("posts");

  const photos = useMemo(() => {
    return posts
      .flatMap((p) => (p.media || []).map((m) => ({ postId: p.postId, url: m })))
      .filter((m) => !/\.(mp4|webm|ogg)$/i.test(m.url));
  }, [posts]);

  return (
    <section className="profile-tabs">
      <div className="tabs">
        <button
          className={`tab ${tab === "posts" ? "active" : ""}`}
          onClick={() => setTab("posts")}
          type="button"
        >
          <GridIcon /> Posts
        </button>
        <button
          className={`tab ${tab === "photos" ? "active" : ""}`}
          onClick={() => setTab("photos")}
          type="button"
        >
          <CameraIcon /> Photos
        </button>
      </div>

      {tab === "posts" && (
        <div className="posts-list">
          {posts.length === 0 ? (
            <span className="empty-hint">no post</span>
          ) : (
            posts.map((p) => (
              <div className="post-wrap" key={p.postId}>
                {renderPost(p)}
              </div>
            ))
          )}
        </div>
      )}

      {tab === "photos" && (
        <div className="photos-grid">
          {photos.length === 0 ? (
            <span className="empty-hint">no photo</span>
          ) : (
            photos.map((m, i) => (
              <div className="photo-cell" key={`${m.postId}-${i}`}>
                <img
                  src={m.url}
                  alt="post media"
                  className="photo"
                  loading="lazy"
                />
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}