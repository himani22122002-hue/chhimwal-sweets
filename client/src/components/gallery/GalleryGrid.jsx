import GalleryCard from "./GalleryCard";

const GalleryGrid = ({ items, onImageClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} onClick={onImageClick} />
      ))}
    </div>
  );
};

export default GalleryGrid;
