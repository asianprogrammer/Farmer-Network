import { useCallback, useMemo } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";
import Post from "@/components/layout/Post"; // your existing Post component
import "../styles/Profile.css";

/**
 * Props:
 *  - user: { id, username, ... }
 *  - loginID: string | number
 *  - posts: Post[]
 *  - onDeletePost?: (postId) => void
 *
 * Notes:
 *  - We pass `isOwner` and `onDeletePost` down via renderPost to your Post component.
 *  - Your Post should render its own delete button when `isOwner === true`.
 */
export default function ProfilePage({
  user,
  loginID,
  posts = [],
  onDeletePost,
}) {
  const isOwner = useMemo(
    () => String(user?.id) === String(loginID),
    [user, loginID]
  );

  const handleDelete = useCallback(
    (postId) => {
      if (typeof onDeletePost === "function") onDeletePost(postId);
    },
    [onDeletePost]
  );

  const renderPost = useCallback(
    (p) => (
      <Post
        key={p.postId}
        {...p}
        isOwner={isOwner}
        onDeletePost={handleDelete}
      />
    ),
    [isOwner, handleDelete]
  );

  return (
    <div className="profile-page">
      <ProfileHeader user={user} isOwner={isOwner} />
      <ProfileTabs posts={posts} renderPost={renderPost} />
    </div>
  );
}