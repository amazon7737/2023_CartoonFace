import React from "react";

const ImageScroll = ({ ImageList }) => {
  const ImageData = ImageList.map((detail, index) => {
    return (
      <>
        <img className="img" src={detail} />
      </>
    );
  });

  return { ImageData };
};

export default ImageScroll;
