import React from "react";
import { Composition, continueRender, delayRender } from "remotion";
import { Episode, OUTRO } from "./ep/Episode";
import { CUT } from "./ep/timeline";

const h = typeof document !== "undefined" ? delayRender("fonts") : null;
if (h !== null) {
  Promise.all(["800 40px Montserrat", "900 40px Montserrat", "900 40px 'Nunito Sans'", "600 40px 'Nunito Sans'", "400 40px Inter", "600 40px Inter", "700 40px Inter", "800 40px Inter"]
    .map((f) => document.fonts.load(f))).then(() => continueRender(h));
}
export const Root: React.FC = () => (
  <Composition id="Episode" component={Episode} durationInFrames={CUT + OUTRO} fps={30} width={1080} height={1920} />
);
