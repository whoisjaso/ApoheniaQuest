import React from "react";
import { Composition, continueRender, delayRender } from "remotion";
import { Episode, OUTRO } from "./ep/Episode";
import { CUT } from "./ep/timeline";

const h = typeof document !== "undefined" ? delayRender("fonts") : null;
if (h !== null) {
  Promise.all(["400 40px 'Bebas Neue'", "800 40px Montserrat", "900 40px Montserrat", "400 40px Marcellus", "italic 500 40px 'Bodoni Moda'",
    "200 40px Jost", "italic 400 40px 'Playfair Display'", "800 40px 'Hanken Grotesk'", "400 40px 'Great Vibes'", "400 40px 'Archivo Black'", "500 40px Inter"]
    .map((f) => document.fonts.load(f))).then(() => continueRender(h));
}
export const Root: React.FC = () => (
  <Composition id="Episode" component={Episode} durationInFrames={CUT + OUTRO} fps={30} width={1080} height={1920} />
);
