import React from 'react';

type Props = {
  name: string;
  images: string[];
};

export const ImagePopup: React.FC<Props> = ({ name, images }) => {
  return (
    <div style={{ maxWidth: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={name} style={{ width: '100%' }} />
        ))}
      </div>
    </div>
  );
};
