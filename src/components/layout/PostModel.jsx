import { useState, useRef, useEffect, useCallback } from "react";
import ModalShell from "@/components/ui/ModalShell";
import CloseIcon from "@/assets/IconComponents/Close";
import ImageIcon from "@/assets/IconComponents/Image";
import VideoIcon from "@/assets/IconComponents/Video";
import CheckIcon from "@/assets/IconComponents/Check";
import PlayIcon from "@/assets/IconComponents/Play";

const MAX_FILES = 3;

const formatSize = (bytes) =>
  bytes
    ? `${(bytes / 1024 ** Math.floor(Math.log(bytes) / Math.log(1024))).toFixed(1)} ${
        ["B", "KB", "MB", "GB"][Math.floor(Math.log(bytes) / Math.log(1024))]
      }`
    : "0 B";

export default function Posting({ username = "Guest", onPost }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const imageRef = useRef();
  const videoRef = useRef();

  useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), [files]);

  const addFiles = useCallback(
    (e, type) => {
      const newList = [...files];
      for (const f of e.target.files) {
        if (newList.length >= MAX_FILES) break;
        const url = URL.createObjectURL(f);
        newList.push({ id: url, url, name: f.name, size: formatSize(f.size), type, file: f });
      }
      setFiles(newList);
      e.target.value = "";
    },
    [files]
  );

  const removeFile = (id) =>
    setFiles((prev) => {
      const toRemove = prev.find((f) => f.id === id);
      if (toRemove) URL.revokeObjectURL(toRemove.url);
      return prev.filter((f) => f.id !== id);
    });

  const handlePost = () => {
    onPost?.({
      content,
      images: files.filter((f) => f.type === "image"),
      videos: files.filter((f) => f.type === "video"),
    });
    setContent("");
    setFiles([]);
  };

  const imgCount = files.filter((f) => f.type === "image").length;
  const vidCount = files.filter((f) => f.type === "video").length;

  return (
    <ModalShell header="Create Post" onClose={() => {}}>
      <section className="post-body">
        <div className="user flex FY-center">
          <div className="profile">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
              alt={username}
            />
          </div>
          <div className="user-info">
            <div className="name">{username}</div>
            <span className="subtitle">Share your thoughts...</span>
          </div>
        </div>

        <section className="post-content">
          <textarea
            placeholder={`What's on your mind, ${username}?`}
            className="post-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </section>

        {!!files.length && (
          <div className="post-media">
            <div className="media-grid">
              {files.map((f) => (
                <div key={f.id} className="media-item">
                  <div className="media-preview">
                    {f.type === "image" ? (
                      <img src={f.url} alt={f.name} className="preview-image" />
                    ) : (
                      <>
                        <video src={f.url} className="preview-video" />
                        <div className="media-play-icon"><PlayIcon /></div>
                      </>
                    )}
                    <div className="media-status"><CheckIcon /></div>
                    <button className="media-close-button" onClick={() => removeFile(f.id)}>
                      <CloseIcon />
                    </button>
                  </div>
                  <p className="media-filename">{f.name} ({f.size})</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="post-footer">
        <div className="post-controls">
          <div className="post-options">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden-input"
              ref={imageRef}
              onChange={(e) => addFiles(e, "image")}
            />
            <button
              className="option-button"
              disabled={files.length >= MAX_FILES}
              onClick={() => imageRef.current?.click()}
            >
              <ImageIcon /> <span className="option-text">Photo ({imgCount}/{MAX_FILES})</span>
            </button>

            <input
              type="file"
              accept="video/*"
              multiple
              className="hidden-input"
              ref={videoRef}
              onChange={(e) => addFiles(e, "video")}
            />
            <button
              className="option-button"
              disabled={files.length >= MAX_FILES}
              onClick={() => videoRef.current?.click()}
            >
              <VideoIcon /> <span className="option-text">Video ({vidCount}/{MAX_FILES})</span>
            </button>
          </div>
        </div>

        <div className="post-action">
          <button
            className="post-button"
            onClick={handlePost}
            disabled={!content.trim() && !files.length}
          >
            Post
          </button>
        </div>
      </footer>
    </ModalShell>
  );
}