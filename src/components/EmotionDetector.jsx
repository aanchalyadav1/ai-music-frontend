import React, { useState } from "react";
import axios from "axios";
import SongCarousel from "./SongCarousel";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function EmotionDetector() {
  const [emotion, setEmotion] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/detect`,
        formData
      );

      setEmotion(data.emotion);
      toast.success(`Detected Emotion: ${data.emotion}`);

      const songsRes = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/recommend`,
        { emotion: data.emotion }
      );

      setSongs(songsRes.data.songs);
    } catch (err) {
      toast.error("Error detecting emotion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detector">
      <h2>🎭 Upload your photo to detect emotion</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading ? <Loader /> : null}
      {emotion && <h3>Detected Emotion: {emotion}</h3>}
      {songs.length > 0 && <SongCarousel songs={songs} />}
    </div>
  );
}
