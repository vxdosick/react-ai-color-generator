import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

export const TFModel = () => {
  const [scratchLoading, setScratchLoading] = useState(false);
  const [predict, setPredict] = useState<string[]>([]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const handleScratchGenerate = () => {
    setScratchLoading(true);
    setTimeout(() => {
        setPredict([getRandomColor()]);
        setScratchLoading(false);
    }, 2000)
  };

  return (
    <>
      <div className="scratch__loadingbox">
        {scratchLoading ? (
          <span className="scratch__loading">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        ) : (
          <span className="scratch__decoration">&#8595;</span>
        )}
      </div>
      {predict.length > 0 ? (
        <div className="scratch__colors">
          <ul className="scratch__colorslist">
            {predict.map((color, index) => {
              return (
                <li key={index} className="scratch__color">
                  <div style={{ backgroundColor: color }}></div>
                  <p className="text__normal">{color}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="scratch__colors">
          <ul className="scratch__colorslist">
            <li className="scratch__color">
              <p className="text__normal">
                This will display your 4 matching colors. 😊
              </p>
            </li>
          </ul>
        </div>
      )}
      <button
        className="scratch__button button__general"
        onClick={handleScratchGenerate}
      >
        Generate
      </button>
    </>
  );
};

export default TFModel;
