import React, {useState,useEffect, useRef} from "react"
import findAngle from "./findAngle";
import * as d3 from "d3";

export default function Interface({dots, colors}) {
  const svgRef = useRef(null)
  const svg = d3.select(svgRef.current)
  const upperSize = {
    width: svgRef.current?.parentNode.clientWidth,
    height: svgRef.current?.parentNode.clientHeight,
  }

  if(!dots){return <svg />}

  svg.html(null)

  const lines = [{coord: [16,14], color: colors.arm.right},
    {coord: [14,12], color: colors.arm.right},
    {coord: [11,13], color: colors.arm.left},
    {coord: [13,15], color: colors.arm.left},
    {coord: [12,24], color: colors.body.right},
    {coord: [11,23], color: colors.body.left},
    {coord: [12,11], color: colors.body.up},
    {coord: [24,23], color: colors.body.up},
    {coord: [24,26], color: colors.leg.right},
    {coord: [26,28], color: colors.leg.right},
    {coord: [23,25], color: colors.leg.left},
    {coord: [25,27], color: colors.leg.left}
  ]

  lines.forEach((line) => {
    let a = line.coord[0];
    let b = line.coord[1]
    
    svg.append('line')
        .style("stroke", line.color)
        .style('filter',"opacity(1)")
        .style("stroke-width", 10)
        .attr('x1',upperSize.width - (dots[a].x) * upperSize.width)
        .attr('y1',dots[a].y * upperSize.height)
        .attr('x2',upperSize.width - (dots[b].x) * upperSize.width)
        .attr('y2',dots[b].y * upperSize.height)
  })
  
  dots.forEach((dot, index) => {
    if (index === 11 || index === 12 ||
      index === 13 || index === 14 ||
      index === 15 || index === 16 ||
      index === 23 || index === 24 ||
      index === 25 || index === 26 ||
      index === 27 || index === 28) { 
        let circle = svg.append('circle')
        .style("stroke", "white")
        .style("stroke-width", 3)
        .style("fill", 'rgba(0,0,0,0.4)')
        .attr("r", 8)
        .attr("cx", upperSize.width - (dot.x) * upperSize.width)
        .attr("cy", (dot.y) * upperSize.height)
    

        svg.append("text")
          .attr("x", upperSize.width - (dot.x) * upperSize.width + (index % 2 === 0? 14 : -30))
          .attr("y", (dot.y) * upperSize.height )
          .text(index)
          .attr('class', 'dotName') 
    }
  });

  return (
    <svg className="svg" ref={svgRef}></svg>
  )
}
