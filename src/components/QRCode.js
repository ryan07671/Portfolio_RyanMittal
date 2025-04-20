import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeComponent = ({ value, size = 200 }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <QRCode
        value={value}
        size={size}
        level="H"
        includeMargin={true}
        className="rounded-lg shadow-lg"
      />
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Scan to view in AR
      </p>
    </div>
  );
};

export default QRCodeComponent; 