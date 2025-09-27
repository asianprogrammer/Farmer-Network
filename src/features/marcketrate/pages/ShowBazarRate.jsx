import { useMemo } from "react";
import BazarRatePage from "./BazarRatePage";

const CATEGORIES = ["সব", "ধান", "সবজি", "ফল", "মসলা", "ডাল", "তেল"];
const MARKETS = [
  "সব",
  "কাওরান বাজার",
  "শাহবাগ বাজার",
  "নিউ মার্কেট",
  "গুলশান বাজার",
  "ধানমন্ডি বাজার",
  "মিরপুর বাজার",
  "উত্তরা বাজার",
];

const BASE_ITEMS = [
  {
    category: "ধান",
    bnName: "চাল",
    enName: "Rice",
    unit: "কেজি",
    price: 65,
    prevPrice: 62,
    trend: "up",
    change: 3,
    quality: "উত্তম",
    market: "কাওরান বাজার",
    updatedAgo: "২ দিন আগে",
  },
  {
    category: "সবজি",
    bnName: "আলু",
    enName: "Potato",
    unit: "কেজি",
    price: 50,
    prevPrice: 55,
    trend: "down",
    change: -5,
    quality: "উত্তম",
    market: "শাহবাগ বাজার",
    updatedAgo: "৩ দিন আগে",
  },
  {
    category: "সবজি",
    bnName: "পেঁয়াজ",
    enName: "Onion",
    unit: "কেজি",
    price: 40,
    prevPrice: 38,
    trend: "up",
    change: 2,
    quality: "মাঝারি",
    market: "কারওয়ান বাজার",
    updatedAgo: "৯ মাস আগে",
  },
  {
    category: "সবজি",
    bnName: "টমেটো",
    enName: "Tomato",
    unit: "কেজি",
    price: 80,
    prevPrice: 75,
    trend: "up",
    change: 5,
    quality: "উত্তম",
    market: "নিউ মার্কেট",
    updatedAgo: "১০ মাস আগে",
  },
  {
    category: "সবজি",
    bnName: "বেগুন",
    enName: "Brinjal",
    unit: "কেজি",
    price: 35,
    prevPrice: 40,
    trend: "down",
    change: -5,
    quality: "উত্তম",
    market: "গুলশান বাজার",
    updatedAgo: "১০ মাস আগে",
  },
  {
    category: "ডাল",
    bnName: "মসুর ডাল",
    enName: "Lentil",
    unit: "কেজি",
    price: 120,
    prevPrice: 115,
    trend: "up",
    change: 5,
    quality: "উত্তম",
    market: "ধানমন্ডি বাজার",
    updatedAgo: "১০ মাস আগে",
  },
  {
    category: "ফল",
    bnName: "কলা",
    enName: "Banana",
    unit: "ডজন",
    price: 60,
    prevPrice: 58,
    trend: "up",
    change: 2,
    quality: "উত্তম",
    market: "মিরপুর বাজার",
    updatedAgo: "১০ মাস আগে",
  },
  {
    category: "তেল",
    bnName: "সরিষার তেল",
    enName: "Mustard Oil",
    unit: "লিটার",
    price: 180,
    prevPrice: 175,
    trend: "up",
    change: 5,
    quality: "উত্তম",
    market: "উত্তরা বাজার",
    updatedAgo: "১০ মাস আগে",
  },
  {
    category: "সবজি",
    bnName: "শসা",
    enName: "Cucumber",
    unit: "কেজি",
    price: 25,
    prevPrice: 30,
    trend: "down",
    change: -5,
    quality: "উত্তম",
    market: "কাওরান বাজার",
    updatedAgo: "৫ দিন আগে",
  },
  {
    category: "সবজি",
    bnName: "গাজর",
    enName: "Carrot",
    unit: "কেজি",
    price: 45,
    prevPrice: 42,
    trend: "up",
    change: 3,
    quality: "উত্তম",
    market: "শাহবাগ বাজার",
    updatedAgo: "১ সপ্তাহ আগে",
  },
  {
    category: "সবজি",
    bnName: "কাঁচা মরিচ",
    enName: "Green Chili",
    unit: "কেজি",
    price: 100,
    prevPrice: 95,
    trend: "up",
    change: 5,
    quality: "উত্তম",
    market: "নিউ মার্কেট",
    updatedAgo: "৩ দিন আগে",
  },
  {
    category: "মসলা",
    bnName: "রসুন",
    enName: "Garlic",
    unit: "কেজি",
    price: 200,
    prevPrice: 190,
    trend: "up",
    change: 10,
    quality: "উত্তম",
    market: "গুলশান বাজার",
    updatedAgo: "২ দিন আগে",
  },
  {
    category: "মসলা",
    bnName: "আদা",
    enName: "Ginger",
    unit: "কেজি",
    price: 150,
    prevPrice: 145,
    trend: "up",
    change: 5,
    quality: "মাঝারি",
    market: "ধানমন্ডি বাজার",
    updatedAgo: "৪ দিন আগে",
  },
  {
    category: "ফল",
    bnName: "আপেল",
    enName: "Apple",
    unit: "কেজি",
    price: 220,
    prevPrice: 210,
    trend: "up",
    change: 10,
    quality: "উত্তম",
    market: "মিরপুর বাজার",
    updatedAgo: "১ সপ্তাহ আগে",
  },
  {
    category: "ফল",
    bnName: "কমলা",
    enName: "Orange",
    unit: "কেজি",
    price: 120,
    prevPrice: 125,
    trend: "down",
    change: -5,
    quality: "উত্তম",
    market: "উত্তরা বাজার",
    updatedAgo: "৫ দিন আগে",
  },
];

function makeDummyData(count = 120) {
  const stamps = ["২ দিন আগে", "৩ দিন আগে", "৫ দিন আগে", "১ সপ্তাহ আগে"];
  const qualities = ["উত্তম", "মাঝারি"];

  const out = [];
  for (let i = 0; i < count; i++) {
    const base = BASE_ITEMS[i % BASE_ITEMS.length];
    const market = MARKETS[(i % (MARKETS.length - 1)) + 1]; // skip "সব"
    const bump = ((i % 7) - 3); // -3..+3
    const price = Math.max(5, base.price + bump);
    const prevPrice = Math.max(5, price - (bump >= 0 ? Math.min(3, bump) : -Math.min(3, bump)));
    const change = price - prevPrice;
    const trend = change >= 0 ? "up" : "down";

    out.push({
      id: `${base.enName}-${i}`,
      category: base.category,
      bnName: base.bnName,
      enName: base.enName,
      unit: base.unit,
      price,
      prevPrice,
      change,
      trend,
      quality: qualities[i % qualities.length],
      market,
      updatedAgo: stamps[i % stamps.length],
    });
  }
  return out;
}

export default function ShowBazarRate() {
  const items = useMemo(() => makeDummyData(120), []);
  return (
    <BazarRatePage
      title="প্রতিদিনের বাজার মূল্যের তালিকা দেখুন"
      subtitle="কৃষি পণ্যের সর্বশেষ বাজার দর এবং মূল্য তুলনা"
      items={items}
      categories={CATEGORIES}
      markets={MARKETS}
    />
  );
}
