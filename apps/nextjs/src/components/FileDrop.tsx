import React, { useCallback } from 'react';


interface FileDropProps {
  onFileDrop: (files: FileList) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onFileDrop }) => {
     
  const handleFileDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      onFileDrop(event.dataTransfer.files);
    },
    [onFileDrop]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  


  return (
    <div
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
      style={{
        width: '300px',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed #3498db',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#ecf0f1',
        margin: '20px auto',
      }}
    >
      <p style={{ textAlign: 'center', color: '#3498db' }}>
        Glissez et déposez un fichier Excel ou CSV ici
      </p>
    </div>
  );
};

export default FileDrop;
