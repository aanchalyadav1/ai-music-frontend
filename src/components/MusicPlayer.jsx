import React, { useEffect, useState, useRef } from "react";

const MusicPlayer = ({ emotion }) => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (!emotion) return;
    const fetchTracks = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend-music/${emotion}`);
      const data = await res.json();
      setTracks(data);
      if (data.length) {
        setCurrentTrack(data[0]);
        audioRef.current.src = data[0].url;
      }
    };
    fetchTracks();
  }, [emotion]);

  const togglePlay = () => {
    if (!currentTrack) return;
    audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
  };

  const nextTrack = () => {
    const idx = tracks.indexOf(currentTrack);
    const next = tracks[(idx + 1) % tracks.length];
    setCurrentTrack(next);
    audioRef.current.src = next.url;
    audioRef.current.play();
  };

  if (!currentTrack) return null;

  return (
    <div className="max-w-md mx-auto p-4 bg-black bg-opacity-50 backdrop-blur-md rounded-xl my-4 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
      <img src={currentTrack.image} alt={currentTrack.name} className="w-48 h-48 rounded-xl mb-2" />
      <h3 className="font-semibold">{currentTrack.name}</h3>
      <p className="text-sm">{currentTrack.artist}</p>
      <div className="flex space-x-4 mt-2">
        <button onClick={togglePlay} className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 transition">Play/Pause</button>
        <button onClick={nextTrack} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition">Next</button>
      </div>
    </div>
  );
};

export default MusicPlayer;
