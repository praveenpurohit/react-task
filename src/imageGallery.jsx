import React, { useEffect, useState } from "react";
import "./App.css";
import image1 from "./assets/image1.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";
import image5 from "./assets/image5.jpeg";
import image6 from "./assets/image6.jpeg";
import image7 from "./assets/image7.png";
import image9 from "./assets/image9.jpeg";
import image8 from "./assets/image8.jpeg";
import image10 from "./assets/image10.jpeg";
import image11 from "./assets/image11.jpeg";
import image12 from "./assets/image12.jpeg";

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const images = [
    { imageUrl: image1 },
    { imageUrl: image2 },
    { imageUrl: image3 },
    { imageUrl: image4 },
    { imageUrl: image5 },
    { imageUrl: image6 },
    { imageUrl: image7 },
    { imageUrl: image8 },
    { imageUrl: image9 },
    { imageUrl: image10 },
    { imageUrl: image11 },
    { imageUrl: image12 },
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleKeyDown = (event) => {
    if (modalOpen && selectedImage !== null) {
      if (event.keyCode === 37) {
        const prevIndex = (selectedImage - 1 + images.length) % images.length;
        setSelectedImage(prevIndex);
      } else if (event.keyCode === 39) {
        const nextIndex = (selectedImage + 1) % images.length;
        setSelectedImage(nextIndex);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, selectedImage]);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const renderThumbnails = () => {
    return (
      <div className="thumbnails-row">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            alt={`Thumbnail ${index}`}
            className={`thumbnail-item ${
              selectedImage === index ? "selected" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    );
  };

  const handleSlideLeft = (e) => {
    e.stopPropagation();
    const prevIndex = (selectedImage - 1 + images.length) % images.length;
    setSelectedImage(prevIndex);
  };

  const handleSlideRight = (e) => {
    e.stopPropagation();
    const nextIndex = (selectedImage + 1) % images.length;
    setSelectedImage(nextIndex);
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Image Gallery</h2>

      <div className="image-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            alt={`${index}`}
            className="grid-item"
            onClick={() => handleImageClick(index)}
          />
        ))}
        {modalOpen && selectedImage !== null && (
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={images[selectedImage].imageUrl}
              alt={` ${selectedImage}`}
              className="modal-content"
            />
            <div className="modal-thumbnails">
              <div className="arrow-left" onClick={handleSlideLeft}>
                &lt;
              </div>
              {renderThumbnails()}
              <div className="arrow-right" onClick={handleSlideRight}>
                &gt;
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageGallery;
