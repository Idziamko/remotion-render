import React from "react";
import { Composition } from "remotion";
import * as Mod from "./Video";

const Video = (Mod as any).default;

// Принимаем несколько распространённых имён экспорта конфига
const raw: any =
  (Mod as any).compositionConfig ||
  (Mod as any).config ||
  (Mod as any).videoConfig ||
  (Mod as any).remotionConfig ||
  {};

const fps: number = typeof raw.fps === "number" ? raw.fps : 30;
const width: number = typeof raw.width === "number" ? raw.width : 1920;
const height: number = typeof raw.height === "number" ? raw.height : 1080;

// Длительность — в кадрах или секундах
const durationInFrames: number =
  typeof raw.durationInFrames === "number"
    ? raw.durationInFrames
    : typeof raw.durationInSeconds === "number"
    ? Math.round(raw.durationInSeconds * fps)
    : 150;

export const Root: React.FC = () => (
  <Composition
    id="Video"
    component={Video}
    fps={fps}
    width={width}
    height={height}
    durationInFrames={durationInFrames}
  />
);
