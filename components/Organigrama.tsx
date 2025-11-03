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

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // === círculos ===
    const circle = g
      .selectAll("circle")
      .data(nodes.descendants())
      .enter()
      .append("circle")
      .attr("fill", (d) => colorScale(d.depth))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("r", (d) => d.r)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .style("cursor", "pointer")
      .style("display", (d) => (d === nodes ? "inline" : "none")) // solo director visible
      .on("click", (event, d) => {
        event.stopPropagation();
        revealChildren(d);
      });

    // === textos ===
    const text = g
      .selectAll("text")
      .data(nodes.descendants())
      .enter()
      .append("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("dy", "0.35em")
      .text((d) => d.data.persona?.nombre ?? d.data.etiqueta)
      .style("fill-opacity", (d) => (d === nodes ? 1 : 0))
      .style("display", (d) => (d === nodes ? "inline" : "none"))
      .attr("fill", (d) => (d.depth <= 1 ? "#fff" : "#1e293b"));

    // === función para revelar hijos con fade ===
    const revealChildren = (parent: d3.HierarchyCircularNode<OrgNode>) => {
      const children = nodes.descendants().filter((n) => n.parent === parent);
      if (!children.length) return;
      let i = 0;
      const step = 150;
      children.forEach((child) => {
        const cSel = circle.filter((n) => n === child);
        const tSel = text.filter((n) => n === child);
        const alreadyVisible =
          (cSel.node() as SVGCircleElement | null)?.style.display === "inline";
        if (alreadyVisible) return;
        setTimeout(() => {
          cSel.style("display", "inline").style("opacity", 0);
          cSel.transition().duration(400).style("opacity", 1);
          tSel.style("display", "inline").style("opacity", 0);
          tSel.transition().duration(400).style("opacity", 1);
        }, i * step);
        i++;
      });
    };

    // === volver al inicio (solo directora) ===
    svg.on("click", () => {
      circle
        .filter((d) => d !== nodes)
        .transition()
        .duration(400)
        .style("opacity", 0)
        .on("end", function () {
          (this as SVGCircleElement).style.display = "none";
        });
      text
        .filter((d) => d !== nodes)
        .transition()
        .duration(400)
        .style("opacity", 0)
        .on("end", function () {
          (this as SVGTextElement).style.display = "none";
        });
    });
  }, []);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50">
      <h1 className="text-xl font-semibold mb-6 text-center">
        Organigrama Institucional
      </h1>
      <svg
        ref={svgRef}
        width="100%"
        height="600"
        viewBox="0 0 600 600"
        className="max-w-[90vw] cursor-pointer"
      />
      <p className="text-sm text-gray-500 mt-2">
        Click en el Director para desplegar / Fondo para volver
      </p>
    </div>
  );
}
