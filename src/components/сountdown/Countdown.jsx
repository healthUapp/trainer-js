
import { useRef, useEffect } from "react";
import * as d3 from "d3";
import './countdown.css';


export default function Countdown({startTime, newTime, width}) {
    const svgRef = useRef(null)

    useEffect(()=>{
        if(newTime && width){
            let startPrecent = 6.28
        let lastPrecent = (6.28 * (1 - newTime / startTime))
        let innerRadius = width/2 - 10
        let outerRadius = width/2 - 16
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
        .attr("id", "svgGradient-1")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");
        gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#E0DCFF")
        .attr("stop-opacity", .9);
        gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgba(134, 117, 255)")
        .attr("stop-opacity", 1);


        
        const arcBack_path = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(100)
            .endAngle(2 * 180);
        
        const arcFront_path = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(lastPrecent);
        
        svg.append("path")
            .attr("class", "arc-1")
            .attr("d", arcBack_path)
            .attr("fill", "#E0DCFF")
            .style("stroke-linecap","round")

        svg.append("path")
            .attr("class", "arc-2")
            .attr("d", arcFront_path)
            .attr("fill", "url(#svgGradient-1)")
            .style("stroke-linecap","round")
            
        svg.append("circle")
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', 12)
            .attr('class', 'circle');
        svg.append("circle")
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', 8)
            .attr('fill', 'rgba(134, 117, 255)')
            


        svg.append("circle")
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', innerRadius - 15)
            .attr('fill', 'none')
            .attr('stroke', '#8675FF')
            .attr('stroke-width','0.53px')
            .attr('stroke-dasharray', "2 10")
            .attr('stroke-dashoffset', 5)
            .attr('stroke-linecap', 'round')
            .attr('stroke', 'black')
        }        
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