import GalleryCard from "./GalleryCard";

const GalleryGrid = ({
  items,
  onImageClick,
  onDelete,
}) => {
  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-3
        sm:gap-4
        md:gap-5
        lg:gap-6
        w-full
      "
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="min-w-0 w-full"
        >
          <GalleryCard
            item={item}
            onClick={onImageClick}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;