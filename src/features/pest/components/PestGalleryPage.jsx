import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/pest.module.css";
import ArrowLeftIcon from "@/assets/IconComponents/ArrowLeftIcon";
import ImageIcon from "@/assets/IconComponents/ImageIcon";

const FALLBACK_CARDS = [
  { img: "https://picsum.photos/200",       caption: "বীজ থেকে চারা তৈরি করুন", url: "https://example.com/seedling" },
  { img: "https://picsum.photos/200",         caption: "সকালে সেচ দিন",             url: "https://example.com/watering" },
  { img: "https://picsum.photos/200",         caption: "স্টেকিং করুন",               url: "https://example.com/staking" },
  { img: "https://picsum.photos/200",     caption: "পচা ফল অপসারণ করুন",         url: "https://example.com/remove-rot" },
  { img: "https://picsum.photos/200",  caption: "পচনের জন্য ছত্রাকনাশক দিন",   url: "https://example.com/fungicide-1" },
  { img: "https://picsum.photos/200", caption: "পচনের জন্য ছত্রাকনাশক দিন",   url: "https://example.com/fungicide-2" },
];

/**
 * Props:
 * - cropBn, cropEn, blurb, sectionTitle
 * - cards: [{ img, caption, url }]
 * - onBack: optional handler (defaults to window.history.back)
 */
export default function PestGalleryPage({
  cropBn = "টমেটো",
  cropEn = "Tomato",
  blurb = "টমেটো একটি জনপ্রিয় সবজি। এটি রান্নায় ব্যবহার করা হয় এবং পুষ্টিকর।",
  sectionTitle = "ক্ষতিকর পোকামাকড়ের ছবি",
  cards = [],
  onBack,
}) {
    console.log(cards)
  const list = Array.isArray(cards) && cards.length ? cards : FALLBACK_CARDS;
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
              const to = `/pest/post=${encodeURIComponent(c.url || "")}`;
              return (
                <Link key={`${c.caption}-${i}`} to={to} className={styles.card}>
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
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}