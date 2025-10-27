import React from "react";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>Analyzing emotion...</h3>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
