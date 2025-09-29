// /seed/ShowFollowUsers.jsx
import { useMemo } from "react";
import FollowUsersPage from "./FollowUsersPage";

// Some avatars from your snippet + dicebear fallbacks
const A = "https://i.postimg.cc/fRVdFSbg/e1ef6545-86db-4c0b-af84-36a726924e74.png";
const D = (seed) => `https://api.dicebear.com/9.x/initials/svg?seed=${seed}`;

const BASE = [
  { name: "Mansura", bio: "Banladesh is my land", followers: 1, avatar: A },
  { name: "SOJOL", bio: "Helllo Bangladesh", followers: 1, avatar: D(1757625520343) },
  { name: "admin", bio: "No bio available", followers: 0, avatar: A },
  { name: "01828271177", bio: "No bio available", followers: 0, avatar: A },
  { name: "Cout9mer123", bio: "No bio available", followers: 0, avatar: A },
  { name: "mosarrofhossain123", bio: "Ok", followers: 0, avatar: D(1757899952223) },
  { name: "bvcjhgfc654", bio: "No bio available", followers: 0, avatar: A },
  { name: "naima123", bio: "No bio available", followers: 0, avatar: A },
  { name: "dyxyw", bio: "yyyyt", followers: 0, avatar: D(1757953764869) },
  { name: "mewmew", bio: "No bio available", followers: 0, avatar: D(1758131791680) },
  { name: "pawakin995@bitfami.com", bio: "No bio available", followers: 0, avatar: A },
  { name: "asdf", bio: "No bio available", followers: 0, avatar: A },
  { name: "asdfasd", bio: "No bio available", followers: 0, avatar: A },
  { name: "fylazy", bio: "No bio available", followers: 0, avatar: A },
  { name: "boluwik", bio: "No bio available", followers: 0, avatar: A },
];

function makeUsers(total = 26) {
  const out = [];
  for (let i = 0; i < total; i++) {
    const b = BASE[i % BASE.length];
    out.push({
      id: `${b.name}-${i}`,
      name: b.name + (i >= BASE.length ? `_${i}` : ""),
      bio: b.bio,
      followers: b.followers,
      avatar: b.avatar.includes("dicebear")
        ? D(`${b.name}-${i}`)
        : b.avatar,
      isVerified: i % 7 === 0, // sprinkle some verified
    });
  }
  return out;
}

export default function ShowFollowUsers() {
  const items = useMemo(() => makeUsers(26), []);
  return (
    <FollowUsersPage
      title="ব্যবহারকারীর অনুসরণ করুন"
      subtitle="নতুন ব্যবহারকারীদের খুঁজে নিন এবং অনুসরণ করুন"
      items={items}
      pageSizeFirst={16}
      pageSizeNext={10}
      onFollow={(user) => {
        // hook into your API here
        console.log("FOLLOW", user.id, user.name);
        return true; // you can return a promise if you want
      }}
      onUnfollow={(user) => {
        console.log("UNFOLLOW", user.id, user.name);
        return true;
      }}
    />
  );
}