
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import './countdown.css';


export default function Countdown({startTime, newTime, width}) {
    const svgRef = useRef(null)

    useEffect(()=>{
        let startPrecent = 6.28
        let lastPrecent = (6.28 * (1 - newTime / startTime))
        let innerRadius = width/2 - 8
        let outerRadius = width/2 - 14
        let dotRadius = (innerRadius + outerRadius) / 2

        let x1 = dotRadius * Math.cos(startPrecent - 3.14 / 2)
        let y1 = dotRadius * Math.sin(startPrecent - 3.14 / 2)

        let x2 = dotRadius * Math.cos(lastPrecent - 3.14 / 2)
        let y2 = dotRadius * Math.sin(lastPrecent - 3.14 / 2)  

       



        const svg = d3.select(svgRef.current)
            .html(null)
            .append("g")
            .attr("transform", `translate(${width/2},${width/2})`)




        var defs = svg.append("defs");
        var gradient = defs.append("linearGradient")
        .attr("id", "svgGradient")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");
        gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#9C90F8")
        .attr("stop-opacity", 1);
        gradient.append("stop")
        .attr("offset", "56.15%")
        .attr("stop-color", "#90B8F8")
        .attr("stop-opacity", 1);
        gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#90ECF8")
        .attr("stop-opacity", 1);


        
        const arcBack_path = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(100)
            .endAngle(2 * 180);
        
        const arcFront_path = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(lastPrecent)
            .endAngle(0);
        
        svg.append("path")
            .attr("class", "arc-1")
            .attr("d", arcBack_path)
            .attr("fill", "rgba(239, 241, 244, 1)")
            .style("stroke-linecap","round")

        svg.append("path")
            .attr("class", "arc-2")
            .attr("d", arcFront_path)
            .attr("fill", "url(#svgGradient)")
            .style("stroke-linecap","round")

        svg.append("circle")
            .attr('cx', x1)
            .attr('cy', y1)
            .attr('r', 9)
            .attr('fill', 'white');
            
        svg.append("circle")
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', 9)
            .attr('fill', 'white');
    },[newTime])


    return(
        <div className="countdown"
        style={{
            width: width,
            height: width,
            right: `calc(50% + ${width/2})`,
            top: `calc(50% + ${width/2})`
        }}
        >
            <p className="countdownText">{Math.floor(newTime)}<span className="countdownText-s">S</span></p>
            <svg className="countdownSVG" ref={svgRef}/>
        </div>
    )
}