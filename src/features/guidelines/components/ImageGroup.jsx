import React from "react";
import "@/assets/style/TableView.css";

export default function ImageGroup({ images = [] }) {
  return (
    <div className="image-group">
      {images.map((src, i) => (
        <img key={i} src={src} alt="" className="image-group__img" />
      ))}
    </div>
  );
}