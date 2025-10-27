import React from "react";

const SongCarousel = ({ songs }) => {
  if (!songs || songs.length === 0) {
    return <p>No songs found for this emotion.</p>;
  }

  return (
    <div className="carousel">
      {songs.map((song, index) => (
        <div key={index} className="song-card">
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
          <audio controls>
            <source src={song.previewUrl} type="audio/mpeg" />
          </audio>
        </div>
      ))}
    </div>
  );
};

export default SongCarousel;
