import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function MiniGraphAccuracy({accuracy}){

    const svgRef = useRef(null)

    useEffect(()=>{
        const svg = d3.select(svgRef.current)
            .html(null)
            .append("g")
            .attr("transform", `translate(${0},${0})`)

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
    

        accuracy.forEach((precent,index) => {
            svg.append('rect')
                .attr('class','cell')
                .attr("x", index * 30)
                .attr("y", 70)
                .attr('width', 16)
                .attr('height', 70)
                .attr('rx', 8)
                .attr('ry', 8)
                .style('fill', "rgba(219, 229, 245, 1)")
            svg.append('rect')
                .attr('class','cell')
                .attr("x", index * 30)
                .attr("y", 140 - (70 * (precent/100)))
                .attr('width', 16)
                .attr('height', 70 * (precent/100))
                .attr('rx', 8)
                .attr('ry', 8)
                .style('fill', "url(#svgGradient)")

        });

    },[accuracy])

    return (
        <>
            <p className="graphExercisesValue">{accuracy.length}<span>/10</span></p>
            <svg className="accuracyGraph" ref={svgRef} />
        </>
    )
}