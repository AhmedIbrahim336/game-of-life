import { invoke } from "@tauri-apps/api";
import React, { useEffect, useRef } from "react";
import { CELL_SIZE, drawCells, drawGrid } from "../utils/canvas";

type Universe = {
  width: number;
  height: number;
  cells: number[];
};

const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    renderUniverse();
  }, [ref]);

  async function renderUniverse() {
    if (!ref.current) return;
    let height = 40;
    let width = 40;
    try {
      let universe: Universe = await invoke("new_universe", {
        height,
        width,
      });

      let canvas = ref.current;
      canvas.height = (CELL_SIZE + 1) * height + 1;
      canvas.width = (CELL_SIZE + 1) * width + 1;

      let ctx = ref.current.getContext("2d");

      if (ctx === null) {
        alert("Unable to draw the universe!");
        return;
      }

      drawGrid(ctx, height, width);
      drawCells(ctx, width, height, universe.cells);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <canvas ref={ref} />
    </div>
  );
};

export default Canvas;