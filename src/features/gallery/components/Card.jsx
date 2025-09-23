import { format as timeagoFormat } from 'timeago.js';
import "@/assets/styles/CardGallery.css";

function Card({
  img,
  video,
  type,
  title,
  username,
  date,
  likes,
  comments,
  shares,
  onAuthorClick,
}) {
  return (
    <div className="card">
      <div className="media">
        {img && <img src={img} alt={`user ${username} photo`} />}
        {video && (
          <video controls>
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className="type">{type}</div>
      </div>

      <section className="card-details">
        <div className="title">{title}</div>
        <span>
          by <button className="author-btn" onClick={() => onAuthorClick && onAuthorClick(username)}>{username}</button> .{" "}
          {(() => {
            // Defensive date parsing to avoid passing Invalid Date to the formatter
            if (!date) return "just now";
            const parsed = date instanceof Date ? date : new Date(date);
            const isValid = parsed instanceof Date && !isNaN(parsed.getTime());
            return isValid ? timeagoFormat(parsed) : "just now";
          })()}
        </span>

        <section className="actions">
          <div>
            <span>❤️</span>
            <span>{likes}</span>
          </div>
          <div>
            <span>💬</span>
            <span>{comments}</span>
          </div>
          <div>
            <span>🔗</span>
            <span>{shares}</span>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Card;
