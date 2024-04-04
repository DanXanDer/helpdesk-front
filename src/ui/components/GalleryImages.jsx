import { useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export const GalleryImages = ({ images, height, width }) => {
  const [fullScreen, setFullScreen] = useState(false);

  const handleScreenChange = (isFullScreen) => {
    setFullScreen(isFullScreen);
  };

  return (
    <ReactImageGallery
      showThumbnails={false}
      onScreenChange={handleScreenChange}
      showPlayButton={false}
      showBullets={true}
      items={images}
      renderItem={(item) => (
        <div className="image-gallery-image">
          <img
            src={item.original}
            alt={item.originalAlt}
            style={{
              width: `${width}`,
              height: fullScreen ? "100vh" : `${height}`,
            }}
          />
        </div>
      )}
    />
  );

};
