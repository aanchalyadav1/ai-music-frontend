import React, { useEffect, useState } from "react";
import axios from "axios";

const MusicCarousel = ({ emotion }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!emotion) return;
    const fetchTracks = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recommend-music/${emotion}`);
      setTracks(res.data);
    };
    fetchTracks();
  }, [emotion]);

  return (
    <div className="max-w-6xl mx-auto my-6 overflow-x-auto flex space-x-4 p-2">
      {tracks.map((track, idx) => (
        <div key={idx} className="min-w-[200px] bg-black bg-opacity-50 backdrop-blur-md rounded-xl p-2 hover:scale-105 transition">
          <img src={track.image} alt={track.name} className="rounded-xl w-full h-40 object-cover" />
          <h3 className="text-center mt-2">{track.name}</h3>
          <p className="text-center text-sm">{track.artist}</p>
        </div>
      ))}
    </div>
  );
};

export default MusicCarousel;
