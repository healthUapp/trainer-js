import React, {useState,useEffect, useRef} from "react"
import * as d3 from "d3";

export default function Interface({dots}) {

  const svgRef = useRef(null)
  const svg = d3.select(svgRef.current)
  const upperSize = {
    width: svgRef.current?.parentNode.clientWidth,
    height: svgRef.current?.parentNode.clientHeight,
  }

  if(!dots){return <svg />}


  svg.style('background', 'rgba(100,100,0,0.2)').html(null)
    
  dots.forEach((dot,index) => {
    svg.append('circle')
    .style("stroke", "white")
    .style("stroke-width", 5)
    .style("fill", "red")
    .attr("r", 10)
    .attr("cx", upperSize.width - (dot.x) * upperSize.width)
    .attr("cy", (dot.y) * upperSize.height);
  });

  


  return (
    <svg className="svg" ref={svgRef}></svg>
  )
}
