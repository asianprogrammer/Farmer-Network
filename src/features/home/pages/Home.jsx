import { useState } from "react";
import FollowerSuggest from "@/components/layout/FollowerSuggest";
import CreatePost from "@/components/layout/CreatePost";
import profile from "@/assets/images/logo.png";
import ModelView from "@/components/layout/ModelView";
import "@/assets/styles/Home.css";

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
        
      </section>
    </>
  );
}
