import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import SearchBar from "./SearchBar";
import UserCard from "@/components/ui/UserCard";

const TABS = [
  { key: "all", label: "All" },
  { key: "online", label: "Online" },
  { key: "friends", label: "Friends" }, // hook up to your friends list when ready
];

// Utility: simple includes match on multiple fields
function matchesQuery(user, q) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    user.name.toLowerCase().includes(needle) ||
    (user.email && user.email.toLowerCase().includes(needle)) ||
    (user.bio && user.bio.toLowerCase().includes(needle))
  );
}

export default function DiscoverPeople({ users }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Virtual/incremental rendering:
  const INITIAL_COUNT = 30; // show 30 first
  const CHUNK = 10;         // then +10 on each end-of-list intersection
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Reset visible count when filters/search change
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [query, activeTab]);

  // Derived lists are memoized for speed
  const filtered = useMemo(() => {
    const base = users.filter((u) => matchesQuery(u, query));
    switch (activeTab) {
      case "online":
        return base.filter((u) => u.online);
      case "friends":
        // Replace with your friends logic; keeping 0 for now
        return base.filter((u) => u.isFriend);
      default:
        return base;
    }
  }, [users, query, activeTab]);

  const visibleUsers = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  // Intersection Observer to lazy-load more items at the end
  const sentinelRef = useRef(null);
  const onIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // load next chunk if we still have hidden results
        setVisibleCount((prev) =>
          Math.min(filtered.length, prev + CHUNK)
        );
      }
    },
    [filtered.length]
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [onIntersect]);

  // Counts for tab badges
  const counts = useMemo(() => {
    const all = users.length;
    const online = users.filter((u) => u.online).length;
    const friends = users.filter((u) => u.isFriend).length;
    return { all, online, friends };
  }, [users]);

  return (
    <section className="discover-people">
      <div className="discover-controls">
        <SearchBar
          placeholder="Search users..."
          onChange={(value) => setQuery(value)}
          defaultValue=""
          delay={250}
        />

        <div className="tab-row" role="tablist" aria-label="User filters">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={activeTab === t.key}
              className={`tab-btn ${activeTab === t.key ? "is-active" : ""}`}
              onClick={() => setActiveTab(t.key)}
              title={
                t.key === "friends"
                  ? `Friends: ${counts.friends} - Click to see your connected friends`
                  : undefined
              }
            >
              {t.label} ({counts[t.key]})
            </button>
          ))}
        </div>
      </div>

      <div className="user-list" role="list">
        {visibleUsers.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}

        {/* Sentinel for infinite scroll */}
        <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No users found. Try a different search.</p>
        </div>
      )}
    </section>
  );
}