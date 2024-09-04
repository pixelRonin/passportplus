import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFiles } from '../../../../services/UploadService'; // Adjust the path as necessary

const UploadDocuments = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      setAcceptedFiles(files);
    },
    multiple: true,
    accept: 'image/*,application/pdf', // Adjust based on your file requirements
  });

  const handleUpload = async () => {
    if (!acceptedFiles.length) return;

    try {
      setUploadStatus('Uploading...');
      // Call the upload service
      await uploadFiles(acceptedFiles);
      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Error during file upload:', error.message);
      setUploadStatus('Failed to upload files.');
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Documents</h2>
      
      <div
        {...getRootProps({
          className: `border-2 border-dashed rounded-lg p-6 mb-4 transition-colors duration-300 ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
          }`
        })}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 text-center">
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag & drop some files here, or click to select files'}
        </p>
      </div>
      
      <button
        onClick={handleUpload}
        className={`bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-300 ${
          !acceptedFiles.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
        disabled={!acceptedFiles.length}
      >
        Upload Files
      </button>
      {uploadStatus && <p className="mt-4 text-gray-600">{uploadStatus}</p>}
    </div>
  );
};

export default UploadDocuments;
