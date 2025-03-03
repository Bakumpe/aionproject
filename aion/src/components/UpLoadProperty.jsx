import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import config from "../.config"

function UpLoadProperty() {
  const { user, token } = useContext(UserContext);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("ref", "user"); // The name of the content type
    formData.append("refId", Property.id); // The ID of the user
    formData.append("field", "photos"); // The name of the field in the content type

    try {
      const uploadResponse = await axios.post(
        `${config.apiUrl}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedFiles = uploadResponse.data;
      const photoUrls = uploadedFiles.map((file) => file.url); // Extract the URLs of the uploaded files

      // Update the property's PhotoUrls
      await axios.put(
        `${config.apiUrl}${property.id}`,
        {
          photoUrls: photoUrls,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Photo URLs updated successfully:", photoUrls);
    } catch (error) {
      console.error("Error uploading photos or updating property:", error);
      alert("Error uploading photos or updating property:", error);
    }
  };

  return (
    <>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={uploadFiles}>Upload</button>
    </>
  );
}

export default UpLoadProperty;
