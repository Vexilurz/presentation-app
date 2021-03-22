import React from 'react';

interface Props {}

export const VideoEditorPage = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-grow">
        <div className="w-1/4 bg-secondary-500"></div>
        <div className="w-3/4 bg-primary-900"></div>
      </div>
      <div className="w-full h-16 bg-secondary-600">
      </div>
    </div>
  );
};
