import React, { useState, useRef } from "react";
import SendIcon from "@/assets/IconComponents/SendIcon";
import "@/assets/styles/commentbox.css";

export default function CommentBox({
  profileSrc = "https://api.dicebear.com/7.x/avataaars/svg?seed=1758770649432",
  placeholder = "Write a comment...",
  onSubmit,
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const trimmed = value.trim();
  const isDisabled = trimmed.length === 0;

  const handleSubmit = () => {
    if (isDisabled) return;
    if (typeof onSubmit === "function") onSubmit(trimmed);
    setValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="comment-box" role="form" aria-label="Comment form">
      <span className="avatar">
        <img src={profileSrc} alt="Profile" />
      </span>

      <div className="input-wrap">
        <input
          ref={inputRef}
          className="comment-input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Write a comment"
        />
        <button
          type="button"
          className="send-btn"
          onClick={handleSubmit}
          disabled={isDisabled}
          aria-label="Send comment"
          title="Send"
        >
          <SendIcon
            className="send-icon"
            aria-hidden="true"
            style={{ color: "#d2d9e2ff" }}
          />
        </button>
      </div>
    </div>
  );
}
