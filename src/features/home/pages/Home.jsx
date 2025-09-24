import { useState } from "react";
import "@/assets/styles/Home.css";

import FollowerSuggest from "@/components/layout/FollowerSuggest";
import CreatePost from "@/components/layout/CreatePost";
import profile from "@/assets/images/logo.png";
import ModelView from "@/components/layout/ModelView";
import InfiniteFeed from "../../feed/pages/InfiniteFeed";


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
    <section className="flex FY-center">
      <FollowerSuggest />
      {/* Fake follow suggest space */}
      <section className="fake-follow-section"></section>

      <section className="feed-area">
        <CreatePost
          user="John"
          profile={profile}
          onTextClick={() => seeLike(true)}
          onPhotoVideoClick={() => seeComment(true)}
          onFellingClick={() => alert("Feelings/Activity Clicked")}
        />

        <InfiniteFeed />
      </section>

    </section>
  );
}
