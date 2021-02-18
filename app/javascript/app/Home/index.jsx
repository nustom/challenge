import 'toastr/build/toastr.min.css'
import './home.scss';

import React, { useState } from "react";
import toastr from 'toastr';
import { bytesToSize } from '../helpers/common';

export default function Hello() {
  //--------------------------------------------------------
  // Init states
  //--------------------------------------------------------
  const [pendingImages, setPendingImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState((+new Date()));


  //--------------------------------------------------------
  // Handlers
  //--------------------------------------------------------
  const handleFileInputChange = e => {
    if (e.target.files.length) {
      const files = [...e.target.files].map((file, index) => {
        file.id = (+new Date()) + index;
        return file;
      });
      setPendingImages(files);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if(pendingImages.length === 0) return;
    setUploadedImages([...uploadedImages, ...pendingImages]);

    toastr.success('Upload successfully!');

    // Reset file input
    setPendingImages([]);
    setFileInputKey((+new Date()));
  };

  const handleRemoveImage = e => {
    if(confirm('Are you sure you want to remove this image?')){
      const imageID = e.target.getAttribute("imageid");
      setUploadedImages(uploadedImages.filter(image => image.id != imageID));
    }
  }


  //--------------------------------------------------------
  // Render
  //--------------------------------------------------------
  return (
    <div className="container">
      <form id="upload-form" onSubmit={handleFormSubmit}>
        <div className="text-center">
          <h1>Upload Images</h1>
          <input
            key={fileInputKey}
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            multiple
          />
          <button className="submit-button"
            type="submit"
            onClick={handleFormSubmit}
          >
            Upload Image
          </button>
        </div>
        {
          (uploadedImages.length > 0) && (
            <div>
              <h2 className="text-center">List of uploaded images:</h2>
              <table className="w-100" id="uploaded-images-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mime Type</th>
                    <th>Size</th>
                    <th>Preview</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    uploadedImages.map((image, index) => (
                      <tr key={index}>
                        <td>{image.name}</td>
                        <td>{image.type}</td>
                        <td>{bytesToSize(image.size)}</td>
                        <td><img className="preview-image" src={URL.createObjectURL(image)}/></td>
                        <td>
                          <span
                            imageid={image.id}
                            className="pointer text-danger text-bold"
                            onClick={handleRemoveImage}
                          >
                            X
                          </span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </form>
    </div>
  )
}
