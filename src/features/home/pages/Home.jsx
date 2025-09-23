import { useState } from "react";
import "@/assets/styles/Home.css";

import FollowerSuggest from "@/components/layout/FollowerSuggest";
import CreatePost from "@/components/layout/CreatePost";
import profile from "@/assets/images/logo.png";
import ModelView from "@/components/layout/ModelView";
import Post from "@/components/layout/Post";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [commentView, setCommentView] = useState(false);

  const seeLike = () => {
    if (!modalVisible) setModalVisible(true);
  };

  const seeComment = () => {
    if (!commentView) setCommentView(true);
  };

  return (
    <>
      <FollowerSuggest />

      <section className="feed-area">
        <CreatePost
          user="John"
          profile={profile}
          onTextClick={() => seeLike(true)}
          onPhotoVideoClick={() => seeComment(true)}
          onFellingClick={() => alert("Feelings/Activity Clicked")}
        />

        {/* For seeing likes dynamic */}
        {modalVisible && (
          <ModelView
            title="Liked by"
            onClose={() => setModalVisible(false)}
          ></ModelView>
        )}

        {/* For seeing comments dynamic */}
        {commentView && (
          <ModelView title="Comments" onClose={() => setCommentView(false)}>
            <section className="fake-like">Like by Jon</section>
            <section className="fake-like">Like by Don</section>
          </ModelView>
        )}

        <Post
          postId={101}
          username="john_doe"
          profile="https://picsum.photos/400/300"
          time="2025-09-21T14:00:00Z" // can also pass new Date() or timestamp
          content="Check out this view!"
          image="https://picsum.photos/500/400"
          likes={8}
          comments={2}
          onLikeClick={(id) => console.log("Liked post", id)}
          onLikesView={(id) => console.log("View likes for", id)}
          onCommentsView={(id) => console.log("View comments for", id)}
        />
      </section>
    </>
  );
}
