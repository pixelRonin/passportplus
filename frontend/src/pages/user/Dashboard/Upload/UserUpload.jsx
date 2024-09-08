import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadFiles from '../../../../services/uploadService'; // Import the upload service

const UserUpload = () => {
    const [uploadStatus, setUploadStatus] = useState(null); // State to handle upload status

    // Handler for file drops
    const onDrop = useCallback((acceptedFiles) => {
        // Create a new FormData object
        const formData = new FormData();

        // Append files to FormData with custom field names
        acceptedFiles.forEach((file, index) => {
            if (file.type.includes('image')) {
                // Use a custom name based on the index or other logic
                const imageName = index === 0 ? 'image1' : 'image2';
                formData.append(imageName, file);
            } else if (file.type === 'application/pdf') {
                formData.append('pdf', file);
            }
        });

        // Call the upload service
        uploadFiles(formData)
            .then(response => {
                setUploadStatus({ success: true, message: response.message });
            })
            .catch(error => {
                setUploadStatus({ success: false, message: error.message || 'Error uploading files' });
            });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="upload-container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {uploadStatus && (
                <div className={`upload-status ${uploadStatus.success ? 'success' : 'error'}`}>
                    {uploadStatus.message}
                </div>
            )}
        </div>
    );
};

export default UserUpload;
