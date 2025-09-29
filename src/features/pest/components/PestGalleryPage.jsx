import React from "react";
import { Link, useInRouterContext } from "react-router-dom";
import styles from "../styles/pest.module.css";
import ArrowLeftIcon from "@/assets/IconComponents/ArrowLeftIcon";
import ImageIcon from "@/assets/IconComponents/ImageIcon";

const FALLBACK_CARDS = [
  { img: "/upload/img/whitefly.jpg",       caption: "বীজ থেকে চারা তৈরি করুন", url: "https://example.com/seedling" },
  { img: "/upload/img/jassid.jpg",         caption: "সকালে সেচ দিন",             url: "https://example.com/watering" },
  { img: "/upload/img/thrips.jpg",         caption: "স্টেকিং করুন",               url: "https://example.com/staking" },
];

export default function PestGalleryPage({
  cropBn = "টমেটো",
  cropEn = "Tomato",
  blurb = "টমেটো একটি জনপ্রিয় সবজি। এটি রান্নায় ব্যবহার করা হয় এবং পুষ্টিকর।",
  sectionTitle = "ক্ষতিকর পোকামাকড়ের ছবি",
  cards = [],
  onBack,
}) {
  const inRouter = useInRouterContext?.() ?? false;
  const list =
    Array.isArray(cards) && cards.length > 0 ? cards : FALLBACK_CARDS;

  const handleBack = onBack || (() => window.history.back());

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeftIcon className={styles.backIcon} />
          ফিরে যান
        </button>

        <div className={styles.titles}>
          <h1 className={styles.h1}>{cropBn}</h1>
          <p className={styles.sub}>{cropEn}</p>
        </div>

        <p className={styles.blurb}>{blurb}</p>
      </div>

      <div className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <ImageIcon className={styles.sectionIcon} />
            {sectionTitle}
          </h2>

          <div className={styles.grid}>
            {list.map((c, i) => {
              const href = `/pest/post=${encodeURIComponent(c.url || "")}`;
              const content = (
                <>
                  <div className={styles.square}>
                    <img
                      src={c.img}
                      alt={c.caption || "Pest image"}
                      className={styles.thumb}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.caption}>{c.caption}</p>
                  </div>
                </>
              );

              return inRouter ? (
                <Link key={`${c.caption}-${i}`} to={href} className={styles.card}>
                  {content}
                </Link>
              ) : (
                <a key={`${c.caption}-${i}`} href={href} className={styles.card}>
                  {content}
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
