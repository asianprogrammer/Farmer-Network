// /components/FollowUsersPage.jsx
import { useMemo, useState, useCallback } from "react";
import styles from "../styles/Follow.module.css";
import UsersIcon from "@/assets/IconComponents/UsersIcon";
import UserPlusIcon from "@/assets/IconComponents/UserPlusIcon";
import UserCard from "@/components/ui/UserCard";

export default function FollowUsersPage({
  title,
  subtitle,
  items = [],
  pageSizeFirst = 16,
  pageSizeNext = 10,
  onFollow,
  onUnfollow,
}) {
  const [visible, setVisible] = useState(pageSizeFirst);
  const [following, setFollowing] = useState(() => new Set());

  const hasMore = visible < items.length;
  const visibleItems = useMemo(() => items.slice(0, visible), [items, visible]);

  const followingCount = following.size;

  const doFollow = useCallback(
    async (user) => {
      const ok = (await onFollow?.(user)) !== false;
      if (ok) setFollowing((s) => new Set(s).add(user.id));
    },
    [onFollow]
  );

  const doUnfollow = useCallback(
    async (user) => {
      const ok = (await onUnfollow?.(user)) !== false;
      if (ok) {
        setFollowing((s) => {
          const n = new Set(s);
          n.delete(user.id);
          return n;
        });
      }
    },
    [onUnfollow]
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* header */}
        <div className={styles.header}>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.sub}>{subtitle}</p>
        </div>

        {/* grid */}
        <div className={styles.grid}>
          {visibleItems.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              isFollowing={following.has(u.id)}
              onFollow={doFollow}
              onUnfollow={doUnfollow}
            />
          ))}
        </div>

        {/* load more */}
        {hasMore && (
          <div className={styles.loadMoreWrap}>
            <button
              className={styles.loadMoreBtn}
              onClick={() =>
                setVisible((v) => Math.min(v + pageSizeNext, items.length))
              }
            >
              আরও দেখুন ({items.length - visible})
            </button>
          </div>
        )}

        {/* footer stats */}
        <div className={styles.statsWrap}>
          <div className={styles.statsCard}>
            <div className={styles.statBlock}>
              <div className={styles.statNum}>{items.length}</div>
              <div className={styles.statLabel}>মোট ব্যবহারকারী</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.statBlock}>
              <div className={styles.statNum}>{followingCount}</div>
              <div className={styles.statLabel}>অনুসরণ করছেন</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}