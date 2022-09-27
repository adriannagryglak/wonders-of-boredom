
import { useState, useEffect } from "react";

export default function InteractiveElement() {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [windowWidth, setWindowWidth] = useState();
  const [windowHeight, setWindowHeight] = useState();

  useEffect(() => {
    const update = (e) => {
      setX(e.x);
      setY(e.y);
    };
    const updateSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    window.addEventListener("resize", updateSize);
    window.addEventListener("mousemove", updateSize);
    window.addEventListener("touchmove", updateSize);

    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
      window.addEventListener("resize", updateSize);
      window.addEventListener("mousemove", updateSize);
      window.addEventListener("touchmove", updateSize);
    };
  }, [setX, setY, setWindowWidth]);

  let input = {
    mouseX: {
      start: 0,
      end: windowWidth,
      current: 0,
    },
    mouseY: {
      start: 0,
      end: windowHeight,
      current: 0,
    },
  };
  input.mouseX.current = x;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseX.fraction =
    (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

  input.mouseX.fraction =
    input.mouseX.fraction < 0
      ? 0
      : input.mouseX.fraction > 1
      ? 1
      : input.mouseX.fraction;

  input.mouseY.current = y;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
  input.mouseY.fraction =
    (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

  input.mouseY.fraction =
    input.mouseY.fraction < 0
      ? 0
      : input.mouseY.fraction > 1
      ? 1
      : input.mouseY.fraction;

  let output = {
    x: {
      start: 50,
      end: 0,
      current: 0,
    },
    y: { start: 50, end: 0, current: 0 },
  };

  output.x.range = output.x.end - output.x.start;
  output.x.current = output.x.end - input.mouseX.fraction * output.x.range;

  output.y.range = output.y.end - output.y.start;
  output.y.current = output.y.end - input.mouseY.fraction * output.y.range;

  return 
    //element witch transform={`translate(${output.x.current}px,${output.y.current}px)`}
}
