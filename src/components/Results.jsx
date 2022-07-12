import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Results(){

    const results = localStorage.getItem('results')

    console.log(results)

    const svgRef_1 = useRef(null)
    const svgRef_2 = useRef(null)
    const svgRef_3 = useRef(null)

    
    const width = 240
    const allExResults = []
    let precentAccuracy = 0

    useEffect(()=>{
        // results.forEach(result => {
        //     let precent = result.accuracy.length > 0 ? Math.floor(result.accuracy.reduce((sum, elem)=>{return sum + elem}, 0) / result.accuracy.length) : 0
        //     precentAccuracy = Math.floor(precentAccuracy + precent)
        // });
        
        // precentAccuracy = Math.floor(precentAccuracy / results.length)

        // drawCircleGraph( results.length / set.length, "Exercises", "rgba(174, 237, 228, 1)", "rgba(163, 220, 239, 1)", svgRef_1.current)
        // drawCircleGraph( 0.82, "Time", "rgba(249, 155, 181, 1)", "rgba(255, 248, 182, 0.9)", svgRef_2.current)
        // drawCircleGraph( (precentAccuracy? precentAccuracy : 87)/100,  "Accuracy" , "rgba(149, 136, 246, 1)", "rgba(204, 238, 212, 1)", svgRef_3.current)
    },[results])

    const drawCircleGraph = (val, text, grColorStart, grColorEnd, svgRef) => {
        let startPrecent = 6.28  * 0.6
        let lastPrecent = 6.28 * (0.6 + (0.8 * val))

        let innerRadius = width/2 - 34
        let outerRadius = width/2 - 14
        let middleRadius = (innerRadius + outerRadius) / 2
        let dotRadius = (outerRadius - innerRadius) / 2

        let x1 = middleRadius * Math.cos(startPrecent - 3.14 / 2)
        let y1 = middleRadius * Math.sin(startPrecent - 3.14 / 2)

        let x2 = middleRadius * Math.cos(lastPrecent  - 3.14 / 2)
        let y2 = middleRadius * Math.sin(lastPrecent  - 3.14 / 2)  


        const svg = d3.select(svgRef)
            .html(null)
            .append("g")
            .attr("transform", `translate(${width/2},${width/2})`)

        var defs = svg.append("defs");

        var gradient = defs.append("linearGradient")
        .attr("id", `svgGradient-${text}`)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");
        gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", grColorStart)
        .attr("stop-opacity", 1);
        gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", grColorEnd)
        .attr("stop-opacity", 1);


        
        const arcBack_path = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle((6.28 * 1.2) / 2)
            .endAngle((6.28 * 2.8) / 2);
        
        const arcFront_path = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(lastPrecent)
            .endAngle(startPrecent);
        
        svg.append("path")
            .attr("class", "arc-1")
            .attr("d", arcBack_path)
            .attr("fill", "rgba(239, 241, 244, 1)")
            .style("stroke-linecap","round")

        svg.append("circle")
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', dotRadius)
            .attr('fill', grColorEnd)
            .style("filter","opacity(0.7)")

        svg.append("path")
            .attr("class", "arc-2")
            .attr("d", arcFront_path)
            .attr("fill", `url(#svgGradient-${text})`)

        svg.append("circle")
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', dotRadius)
            .attr('fill', grColorEnd)
            .style("filter","opacity(0.2)")
        

        svg.append("circle")
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', 3.5)
            .attr('fill', 'black')
            

        svg.append("text")
            .attr('x', 0)
            .attr('y', -20)
            .text(text)
            .attr('text-anchor', 'middle')
            .attr('class', 'circleText');
            

        svg.append("text")
            .attr('x', 0)
            .attr('y', 30)
            .attr("class", "resultRoundGraphText")
            .attr('text-anchor','middle')
            .text(`${val * 100}%`);
    }



    return <div className="results">
        <h1 className="resultHead">{"your score for the day".toUpperCase()}</h1>
        <h6 className="resultHead-bottom">{new Date().toLocaleString('ru',{month:"numeric",day:"numeric", year: "numeric", minute: "2-digit", hour: "2-digit"})}</h6>

        
        <svg className="resultCircleGraph gr-1" ref={svgRef_1}></svg>
        <svg className="resultCircleGraph gr-2" ref={svgRef_2}></svg>
        <svg className="resultCircleGraph gr-3" ref={svgRef_3}></svg>
        {/* {   
            results.map((result,index)=> {
                allExResults.push(result.value / 10)
                const precentAccuracy = result.accuracy.length > 0 ? Math.floor(result.accuracy.reduce((sum, elem)=>{return sum + elem}, 0) / result.accuracy.length) : 0
                return  (
                    <p className="resultElement" key={index}>{result.name}: <span 
                        style={{"color":'rgb(177, 63, 29)'}}>{result.value}({precentAccuracy}%)</span>
                    </p>
                )
            } )
        } */}
        
    </div>
}