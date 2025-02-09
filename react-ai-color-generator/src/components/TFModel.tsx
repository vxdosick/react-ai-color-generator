import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

import { useColorDataset } from "../hooks/useColorDataset";

export const TFModel = () => {
  const [scratchLoading, setScratchLoading] = useState(false);
  const [predict, setPredict] = useState<string[]>([]);
  const [model, setModel] = useState<tf.Sequential | null>(null);
  const [trainig, setTraining] = useState(true);

  const createModel = () => {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 4, activation: "relu", inputShape: [1] })
    );
    model.add(tf.layers.dense({ units: 2, activation: "relu" }));
    model.add(tf.layers.dense({ units: 3, activation: "sigmoid" }));
    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    console.log("Model created:", model.summary());
    return model;
  };

  const trainingData = useColorDataset();

  // Функция для обучения модели
  const trainModel = async (model: tf.Sequential) => {
    const xs = tf.tensor2d(
      trainingData.map((d) => d.input),
      [trainingData.length, 1]
    );
    const ys = tf.tensor2d(
      trainingData.map((d) => d.output),
      [trainingData.length, 3]
    );

    await model.fit(xs, ys, {
      epochs: 1000,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (epoch % 20 === 0)
            console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
        },
      },
    });

    setTraining(false);
  };

  useEffect(() => {
    const newModel = createModel();
    trainModel(newModel).then(() => {
      setModel(newModel);
    });
  }, []);

  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleScratchGenerate = async () => {
    if (!model) {
      console.log("Model training in progress...");
      return;
    }

    setScratchLoading(true);

    const baseColor: string = getRandomColor();
    console.log("Base color:", baseColor);

    const colorInput: number[] = [Math.random()];
    const inputTensor: tf.Tensor2D = tf.tensor2d(colorInput, [1, 1]);

    const outputTensor = model.predict(inputTensor) as tf.Tensor;
    const outputData = await outputTensor.data();

    const generatedColors: string[] = [];
    for (let i = 0; i < 3; i++) {
      const r = Math.floor(outputData[i] * 255)
        .toString(16)
        .padStart(2, "0");
      const g = Math.floor(outputData[(i + 1) % 3] * 255)
        .toString(16)
        .padStart(2, "0");
      const b = Math.floor(outputData[(i + 2) % 3] * 255)
        .toString(16)
        .padStart(2, "0");
      generatedColors.push(`#${r}${g}${b}`);
    }

    setTimeout(() => {
      setPredict([baseColor, ...generatedColors]);
      setScratchLoading(false);
    }, 2000);
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
            {predict.map((color, index) => (
              <li key={index} className="scratch__color">
                <div style={{ backgroundColor: color }}></div>
                <p className="text__normal">{color}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="scratch__colors">
          <ul className="scratch__colorslist">
            <li className="scratch__color">
              {trainig ? (
                <>
                  <p className="text__normal">The model is still learning ⌛</p>
                </>
              ) : (
                <p className="text__normal">
                  The model is ready for use. ✅ This will display your 4
                  matching colors. 😊
                </p>
              )}
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
