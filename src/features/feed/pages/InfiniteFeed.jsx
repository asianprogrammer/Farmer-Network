import { useEffect, useRef, useState } from "react";
import Post from "@/components/layout/Post"; // adjust path to your Post component

// Dummy generator for posts
function generatePosts(start, count) {
  return Array.from({ length: count }, (_, i) => {
    const id = count + i;

    // create a mixed media array: 1 image + 1 video (or more if you like)
    const media = [
      `https://picsum.photos/seed/i${id}/500/400`,
      `https://picsum.photos/seed/i${id + 2}/500/400`,
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    ];

    return {
      postId: id,
      username: `user_${id}`,
      isLiked: Math.round(Math.random() * 1),
      profile: `https://picsum.photos/seed/p${id}/100/100`,
      time: new Date(Date.now() - id * 60_000).toISOString(), // staggered times
      content: `This is post number ${id}`,
      media, // ✅ new array prop
      likes: Math.floor(Math.random() * 20),
      comments: Math.floor(Math.random() * 10),
    };
  });
}


export default function InfiniteFeed() {
  const [posts, setPosts] = useState(() => generatePosts(1, 10));
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  // Intersection observer to detect when bottom sentinel is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          // Load 10 more posts
          const nextPage = page + 1;
          setPosts((prev) => [...prev, ...generatePosts(nextPage * 10 - 9, 10)]);
          setPage(nextPage);
        }
      },
      { threshold: 1.0 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, [page]);

  return (
    <div className="feed">
      {posts.map((p) => (
        <Post
          key={p.postId}
          {...p}
          onLikeClick={(id) => console.log("Liked post", id)}
          onLikesView={(id) => console.log("View likes for", id)}
          onCommentsView={(id) => console.log("View comments for", id)}
        />
      ))}

      {/* Sentinel element to trigger loading more */}
      <div ref={loaderRef} style={{ height: "40px" }} />
    </div>
  );
}