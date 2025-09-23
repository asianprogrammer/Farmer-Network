import Filter from "@/features/gallery/components/Filter";
import Card from "@/features/gallery/components/Card.jsx";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

import "@/assets/styles/gallery.css";
import "@/assets/styles/LightBoxCustom.css";
import { useState, useMemo, useCallback } from "react";

export default function Gallery() {

  // Internal static sample cards
  const cards = [
    {
      id: 1,
      type: "image",
      img: "https://picsum.photos/600/400",
      title: "Beautiful Landscape",
      username: "alice",
      date: "2025-09-01T12:00:00",
      likes: 10,
      comments: 2,
      shares: 0,
    },
    {
      id: 2,
      type: "video",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      title: "Sample Video",
      username: "bob",
      date: "2025-09-16T10:00:00",
      likes: 5,
      comments: 1,
      shares: 0,
    },
    {
      id: 3,
      type: "image",
      img: "https://picsum.photos/700/500",
      title: "City Skyline",
      username: "carol",
      date: "2025-05-20T08:30:00",
      likes: 3,
      comments: 0,
      shares: 0,
    },
    {
      id: 4,
      type: "image",
      img: "https://picsum.photos/800/600",
      title: "Forest Path",
      username: "dave",
      date: "2024-04-15T15:45:00",
      likes: 2,
      comments: 0,
      shares: 0,
    },
    ,
    {
      id: 4,
      type: "image",
      img: "https://picsum.photos/800/600",
      title: "Forest Path",
      username: "dave",
      date: "2024-04-15T15:45:00",
      likes: 2,
      comments: 0,
      shares: 0,
    },
    ,
    {
      id: 4,
      type: "image",
      img: "https://picsum.photos/800/600",
      title: "Forest Path",
      username: "dave",
      date: "2024-04-15T15:45:00",
      likes: 2,
      comments: 0,
      shares: 0,
    },
    ,
    {
      id: 4,
      type: "image",
      img: "https://picsum.photos/800/600",
      title: "Forest Path",
      username: "dave",
      date: "2024-04-15T15:45:00",
      likes: 2,
      comments: 0,
      shares: 0,
    }
  ];

  const [filterType, setFilterType] = useState("all");

  const filtered = useMemo(() => {
    if (filterType === "all") return cards;
    if (filterType === "images") return cards.filter((c) => c.type === "image");
    if (filterType === "videos") return cards.filter((c) => c.type === "video");
    return cards;
  }, [cards, filterType]);

  // build slides from filtered items (Lightbox expects an array of slides)
  const slides = useMemo(() => {
    return filtered.map((it) => {
      if (it.type === "image") {
        return { type: "image", src: it.img, meta: it };
      }

      if (it.type === "video") {
        return {
          type: "video",
          src: it.video,
          sources: [{ src: it.video, type: "video/mp4" }],
          poster: it.poster || it.img || undefined,
          meta: it,
        };
      }

      return { type: "image", src: it.img || "", meta: it };
    });
  }, [filtered]);

  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setStartIndex(index);
    setOpen(true);
  }, []);

  const counts = useMemo(
    () => ({
      all: cards.length,
      images: cards.filter((c) => c.type === "image").length,
      videos: cards.filter((c) => c.type === "video").length,
    }),
    [cards]
  );

  return (
    <>
      <Filter counts={counts} onFilterChange={setFilterType} />

      <div className="cards">
        {filtered.map((it, idx) => (
          <Card key={it.id || idx} {...it} onOpen={() => openLightbox(idx)} />
        ))}
      </div>

      <Lightbox
        plugins={[Video]}
        open={open}
        index={startIndex}
        close={() => setOpen(false)}
        slides={slides}
      />
    </>
  );
}