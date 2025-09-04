import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#0B0B0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D1FF3D',
          fontSize: 72,
          fontFamily: 'Inter, sans-serif'
        }}
      >
        TheCueRoom
      </div>
    ),
    size
  );
}
