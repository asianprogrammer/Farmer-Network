import styles from "../styles/Bazar.module.css";
import MapPinIcon from "@/assets/IconComponents/MapPinIcon";
import TrendingUpIcon from "@/assets/IconComponents/TrendingUpIcon";
import TrendingDownIcon from "@/assets/IconComponents/TrendingDownIcon";
import WheatIcon from "@/assets/IconComponents/WheatIcon";
import CarrotIcon from "@/assets/IconComponents/CarrotIcon";
import LeafIcon from "@/assets/IconComponents/LeafIcon";
import AppleIcon from "@/assets/IconComponents/AppleIcon";

/**
 * Chooses category icon + accent class
 */
function useCategoryIcon(category) {
  switch (category) {
    case "ধান":     return { Icon: WheatIcon, accent: styles.accentYellow, tag: styles.tag };
    case "সবজি":    return { Icon: CarrotIcon, accent: styles.accentOrange, tag: styles.tag };
    case "ফল":      return { Icon: AppleIcon,  accent: styles.accentRed,    tag: styles.tag };
    case "মসলা":    return { Icon: LeafIcon,   accent: styles.accentGreen,  tag: styles.tag };
    case "ডাল":     return { Icon: LeafIcon,   accent: styles.accentGreen,  tag: styles.tag };
    case "তেল":     return { Icon: LeafIcon,   accent: styles.accentGreen,  tag: styles.tag };
    default:        return { Icon: LeafIcon,   accent: styles.accentGray,   tag: styles.tag };
  }
}

/**
 * @param {{
 *  category:string, title:string, name:string, quality:string,
 *  price:number, unit:string, trend:{dir:'up'|'down', delta:number},
 *  prevPrice:number, market:string, updatedAgo:string
 * }} props
 */
export default function BazarCard({
  category, title, name, quality = "উত্তম",
  price, unit, trend = { dir: "up", delta: 0 },
  prevPrice, market, updatedAgo
}) {
  const { Icon, accent, tag } = useCategoryIcon(category);
  const trendUp = trend?.dir !== "down";

  return (
    <article className={styles.card}>
      {/* header */}
      <div className={styles.cardTop}>
        <div className={styles.cardCatLeft}>
          <Icon className={`${styles.catIcon} ${accent}`} />
          <span className={styles.catText}>{category}</span>
        </div>
        <div className={styles.updated}>{updatedAgo}</div>
      </div>

      {/* names */}
      <div className={styles.titleBlock}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardSub}>{name}</p>
        <span
          className={`${tag} ${
            quality === "উত্তম"
              ? styles.tagGood
              : quality === "মাঝারি"
              ? styles.tagMid
              : styles.tagLow
          }`}
        >
          {quality}
        </span>
      </div>

      {/* price row */}
      <div className={styles.priceRow}>
        <div>
          <span className={styles.priceNow}>৳{price}</span>
          <span className={styles.priceUnit}>{unit}</span>
        </div>
        <div className={`${styles.trend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
          {trendUp ? <TrendingUpIcon className={styles.trendIcon} /> : <TrendingDownIcon className={styles.trendIcon} />}
          <span className={styles.trendDelta}>{trend?.delta > 0 ? (trendUp ? "+" : "-") : ""}{Math.abs(trend?.delta || 0)}</span>
        </div>
      </div>
      <div className={styles.prev}>পূর্বের দাম: ৳{prevPrice}{unit}</div>

      {/* location */}
      <div className={styles.locRow}>
        <MapPinIcon className={styles.pin} />
        <span className={styles.locText}>{market}</span>
      </div>
    </article>
  );
}