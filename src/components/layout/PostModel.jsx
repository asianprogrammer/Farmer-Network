import { useState, useRef, useCallback, useEffect } from 'react';

// Recreated SVG Icons from the original HTML
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon-lg"
  >
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const CloseMediaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon-sm icon-white"
  >
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon-md"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
    <circle cx="9" cy="9" r="2"></circle>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
  </svg>
);

const VideoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon-md"
  >
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
    <rect x="2" y="6" width="14" height="12" rx="2"></rect>
  </svg>
);

const CheckIcon = () => (
  <svg className="icon-xs icon-white" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const PlayIcon = () => (
  <svg
    className="icon-sm icon-white"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

function Posting({ username = 'Guest', onPost }) {
  const [postContent, setPostContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const MAX_FILES = 3;

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [selectedFiles]);

  const handleFileChange = useCallback(
    (event, fileType) => {
      const files = event.target.files;
      if (!files) return;

      const currentFilesCount = selectedFiles.length;
      const newFilesCount = files.length;
      const totalFiles = currentFilesCount + newFilesCount;

      if (totalFiles > MAX_FILES) {
        alert(`You can only upload a maximum of ${MAX_FILES} files.`);
        return;
      }

      const newFiles = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file),
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        size: formatFileSize(file.size),
        type: fileType,
      }));

      setSelectedFiles((prev) => [...prev, ...newFiles]);
      event.target.value = '';
    },
    [selectedFiles]
  );

  const handleRemoveFile = useCallback((fileId) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter((file) => file.id !== fileId);
    });
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  }, []);

  const handlePost = useCallback(() => {
    const postData = {
      content: postContent,
      images: selectedFiles.filter(f => f.type === 'image').map(img => ({ name: img.name, size: img.size, file: img.file })),
      videos: selectedFiles.filter(f => f.type === 'video').map(vid => ({ name: vid.name, size: vid.size, file: vid.file })),
    };
    
    if (onPost) {
      onPost(postData);
    }
    
    setPostContent('');
    setSelectedFiles([]);
  }, [postContent, selectedFiles, onPost]);

  const imagesCount = selectedFiles.filter((f) => f.type === 'image').length;
  const videosCount = selectedFiles.filter((f) => f.type === 'video').length;

  return (
    <section className="model-container">
      <section className="model">
        <header className="model-header flex FY-center F-space">
          <span className="title">Create Post</span>
          <button className="close-model button-base icon-button">
            <CloseIcon />
          </button>
        </header>

        <section className="post-body">
          <section className="user flex FY-center">
            <div className="profile">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                alt={`${username}'s profile`}
              />
            </div>
            <div className="user-info">
              <div className="name">{username}</div>
              <span className="subtitle">Share your thoughts...</span>
            </div>
          </section>

          <section className="post-content">
            <textarea
              name=""
              id=""
              placeholder={`What's on your mind, ${username}?`}
              className="post-textarea"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </section>

          {selectedFiles.length > 0 && (
            <div className="post-media">
              <div className="media-grid">
                {selectedFiles.map((file) => (
                  <div key={file.id} className="media-item">
                    <div className="media-preview">
                      {file.type === 'image' ? (
                        <>
                          <img src={file.url} alt={file.name} className="preview-image" />
                          <div className="media-status media-status-image">
                            <CheckIcon />
                          </div>
                        </>
                      ) : (
                        <>
                          <video src={file.url} className="preview-video" />
                          <div className="media-play-icon">
                            <div className="media-play-icon-bg">
                              <PlayIcon />
                            </div>
                          </div>
                          <div className="media-status media-status-video">
                            <CheckIcon />
                          </div>
                        </>
                      )}
                      
                      <button
                        className="media-close-button"
                        onClick={() => handleRemoveFile(file.id)}
                      >
                        <CloseMediaIcon />
                      </button>
                    </div>
                    <p className="media-filename">{file.name} ({file.size})</p>
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
                accept=".jpg,.jpeg,.png"
                multiple
                className="hidden-input"
                ref={imageInputRef}
                onChange={(e) => handleFileChange(e, 'image')}
              />
              <button
                className="option-button"
                disabled={selectedFiles.length >= MAX_FILES}
                onClick={() => imageInputRef.current?.click()}
              >
                <ImageIcon />
                <span className="option-text">Photo ({imagesCount}/{MAX_FILES})</span>
              </button>
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden-input"
                ref={videoInputRef}
                onChange={(e) => handleFileChange(e, 'video')}
              />
              <button
                className="option-button"
                disabled={selectedFiles.length >= MAX_FILES}
                onClick={() => videoInputRef.current?.click()}
              >
                <VideoIcon />
                <span className="option-text">Video ({videosCount}/{MAX_FILES})</span>
              </button>
            </div>
          </div>
          
          <div className="post-action">
            <button
              className="post-button"
              onClick={handlePost}
              disabled={postContent.trim() === '' && selectedFiles.length === 0}
            >
              Post
            </button>
          </div>
        </footer>
      </section>
    </section>
  );
}

export default Posting;