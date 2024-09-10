import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadFiles from '../../../../services/uploadService'; // Import the upload service
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';

const UserUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    // Handle file drops
    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name // Initialize with the original name
        }));

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [], // Accept image files
            'application/pdf': [], // Accept PDF files
        },
        maxSize: 10 * 1024 * 1024, // 10MB file size limit
    });

    // Handle file name change
    const handleNameChange = (index, newName) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index].name = newName;
            return updatedFiles;
        });
    };

    // Remove a specific file
    const removeFile = (fileToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.file !== fileToRemove));
        URL.revokeObjectURL(fileToRemove.preview);
    };

   // Upload files to server
   const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    const names = files.map(file => file.name); // Collect names

    files.forEach((file) => {
        formData.append('files', file.file);
    });

    formData.append('names', JSON.stringify(names)); // Ensure names are JSON string

    try {
        const response = await uploadFiles(formData);
        setUploadStatus({ success: true, message: response.message || 'Files uploaded successfully' });
    } catch (error) {
        setUploadStatus({ success: false, message: error.message || 'Error uploading files' });
    }
};

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div
                {...getRootProps({
                    className: `border-4 border-dashed p-6 rounded-lg cursor-pointer text-center ${
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
                    }`
                })}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-4">
                    <ArrowUpTrayIcon className="w-8 h-8 text-gray-500" />
                    {isDragActive ? (
                        <p className="text-lg font-medium text-blue-600">Drop the files here ...</p>
                    ) : (
                        <p className="text-lg font-medium text-gray-600">Drag & drop files here, or click to select files</p>
                    )}
                </div>
            </div>

            {/* Display File Previews */}
            <div className="mt-6">
                {files.length > 0 && (
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Files to Upload</h2>
                        <button
                            onClick={() => setFiles([])}
                            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                        >
                            Remove all files
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative flex flex-col items-center justify-center p-2 bg-gray-100 rounded-lg shadow-sm">
                            <img
                                src={file.preview}
                                alt="preview"
                                className="w-24 h-24 object-cover rounded-md"
                                onLoad={() => URL.revokeObjectURL(file.preview)}
                            />
                            <button
                                onClick={() => removeFile(file.file)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                value={file.name}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                                className="mt-2 text-sm text-gray-600 border border-gray-300 rounded px-2 py-1"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload Button */}
            {files.length > 0 && (
                <button
                    onClick={handleUpload}
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Upload Files
                </button>
            )}

            {/* Upload Status Feedback */}
            {uploadStatus && (
                <div className={`mt-4 p-4 rounded ${uploadStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {uploadStatus.message}
                </div>
            )}
        </div>
    );
};

export default UserUpload;
