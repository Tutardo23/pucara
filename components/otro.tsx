"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { OrgNode } from "@/types/org";
import { orgData } from "@/data/org";

export default function Organigrama() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 600;

    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, 5])
      .range(["#1e3a8a", "#93c5fd"])
      .interpolate(d3.interpolateHcl);

    const pack = d3.pack<OrgNode>().size([width, height]).padding(25);
    const root = d3
      .hierarchy<OrgNode>(orgData)
      .sum(() => 1)
      .sort((a, b) => (b.height ?? 0) - (a.height ?? 0));

    const nodes = pack(root);
    let focus: d3.HierarchyCircularNode<OrgNode> = nodes;
    let view: [number, number, number];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const circle = g
      .selectAll("circle")
      .data(nodes.descendants())
      .enter()
      .append("circle")
      .attr("fill", (d) => colorScale(d.depth))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        if (focus !== d) {
          zoom(d);
          event.stopPropagation();
        }
      });

    const text = g
      .selectAll("text")
      .data(nodes.descendants())
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("dy", "0.35em")
      .text((d) => d.data.persona?.nombre ?? d.data.etiqueta)
      .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
      .style("display", (d) => (d.parent === root ? "inline" : "none"))
      .attr("fill", (d) => (d.depth <= 1 ? "#fff" : "#1e293b"));

    const zoomTo = (v: [number, number, number]) => {
      const k = width / v[2];
      view = v;
      g.selectAll<SVGCircleElement | SVGTextElement, d3.HierarchyCircularNode<OrgNode>>(
        "circle,text"
      ).attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      circle.attr("r", (d) => d.r * k);
    };

    // ⚙️ Esta versión ignora los tipos de transición (no más errores)
    const zoom = (d: d3.HierarchyCircularNode<OrgNode>) => {
      focus = d;

      const transition: any = svg
        .transition()
        .duration(750)
        .tween("zoom", () => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return (t: number) => zoomTo(i(t));
        });

      text
        .filter((n) => n.parent === focus || n === focus)
        .transition(transition)
        .style("fill-opacity", 1)
        .on("start", function (n) {
          if (n.parent === focus)
            (this as SVGTextElement).style.display = "inline";
        })
        .on("end", function (n) {
          if (n.parent !== focus)
            (this as SVGTextElement).style.display = "none";
        });

      text
        .filter((n) => n.parent !== focus && n !== focus)
        .transition(transition)
        .style("fill-opacity", 0)
        .on("end", function () {
          (this as SVGTextElement).style.display = "none";
        });
    };

    svg.on("click", () => zoom(nodes)); // click fondo = volver al inicio
    zoomTo([nodes.x, nodes.y, nodes.r * 2]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-semibold mb-6 text-center">
        Organigrama Institucional
      </h1>
      <svg
        ref={svgRef}
        width="100%"
        height="600"
        viewBox="0 0 600 600"
        className="max-w-[90vw] cursor-zoom-in"
      />
      <p className="text-sm text-gray-500 mt-2">
        (Haz clic en un círculo para entrar / fondo para volver)
      </p>
    </div>
  );
}