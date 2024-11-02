//form creation fro video upload

import React, { useState } from 'react';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    // Handle form submission here (e.g., send the video file and metadata to the server)
    console.log('Video Title:', title);
    console.log('Video Description:', description);
    console.log('Video File:', videoFile);

    // Reset form
    setTitle('');
    setDescription('');
    setVideoFile(null);
  };

  return (
    <div>
      <h2>Upload a Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Video Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="videoFile">Choose Video File:</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload Video</button>
      </form>
    </div>
  );
};

export default VideoUpload;
