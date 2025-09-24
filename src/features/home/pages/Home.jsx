import { useState } from "react";
import "@/assets/styles/Home.css";

import FollowerSuggest from "@/components/layout/FollowerSuggest";
import CreatePost from "@/components/layout/CreatePost";
import InfiniteFeed from "../../feed/pages/InfiniteFeed";
import profile from "@/assets/images/logo.png";
import Posting from "@/components/layout/PostModel";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("post"); // "post" | "feelings"

  const openModal = (type = "post") => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const handlePostSubmit = (data) => {
    console.log(`${modalType} Data:`, data);
    closeModal();
  };

  return (
    <>
      <section className="flex FY-center">
        <FollowerSuggest />
        <section className="fake-follow-section"></section>

        <section className="feed-area">
          <CreatePost
            user="John"
            profile={profile}
            onTextClick={() => openModal("post")}
            onPhotoVideoClick={() => openModal("post")}
            onFellingClick={() => openModal("feelings")}
          />

          <InfiniteFeed />
        </section>
      </section>

      {modalVisible && (
        <Posting
          user={{ username: "Jon Don", profile: "https://example.com/profile.jpg" }}
          onPost={handlePostSubmit}
          onClose={closeModal}
        />
      )}
    </>
  );
}
