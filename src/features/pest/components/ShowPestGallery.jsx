import PestGalleryPage from "./PestGalleryPage";

const IMG = (name) => `/upload/img/${name}`; // keep your existing folder

const CARDS = [
  { img: IMG("whitefly.jpg"),       caption: "বীজ থেকে চারা তৈরি করুন", url: "https://example.com/seedling" },
  { img: IMG("jassid.jpg"),         caption: "সকালে সেচ দিন",             url: "https://example.com/watering" },
  { img: IMG("thrips.jpg"),         caption: "স্টেকিং করুন",               url: "https://example.com/staking" },
  { img: IMG("rice-blast.jpg"),     caption: "পচা ফল অপসারণ করুন",         url: "https://example.com/remove-rot" },
  { img: IMG("sheath-blight.jpg"),  caption: "পচনের জন্য ছত্রাকনাশক দিন",   url: "https://example.com/fungicide-1" },
  { img: IMG("powdery-mildew.jpg"), caption: "পচনের জন্য ছত্রাকনাশক দিন",   url: "https://example.com/fungicide-2" },
];

export default function ShowPestGallery() {
  return (
    <PestGalleryPage
      cropBn="টমেটো"
      cropEn="Tomato"
      blurb="টমেটো একটি জনপ্রিয় সবজি। এটি রান্নায় ব্যবহার করা হয় এবং পুষ্টিকর।"
      sectionTitle="ক্ষতিকর পোকামাকড়ের ছবি"
      cards={CARDS}
      onBack={() => history.back()}
    />
  );
}