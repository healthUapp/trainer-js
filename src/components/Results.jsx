import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Results({results}){
    const svgRef_1 = useRef(null)
    const svgRef_2 = useRef(null)
    const svgRef_3 = useRef(null)

    
    const width = 240
    const allExResults = []

    useEffect(()=>{
        //ВРЕМЕННО!!!
        let precentAccuracy = 0
        results.forEach(result => {
            let precent = result.accuracy.length > 0 ? Math.floor(results.accuracy.reduce((sum, elem)=>{return sum + elem}, 0) / result.accuracy.length) : 0
            precentAccuracy = Math.floor(precentAccuracy + precent)
        });
        precentAccuracy = Math.floor(precentAccuracy / results.length)
        drawCircleGraph(0.74, "Exercises",  svgRef_1.current)
        drawCircleGraph( 0.33, "Time", svgRef_2.current)
        drawCircleGraph( precentAccuracy/100,  "Accuracy" ,svgRef_3.current)
    },[results])

    const drawCircleGraph = (val, text, svgRef) => {
        let startPrecent = 6.28  * 0.6
        let lastPrecent = 6.28 * (0.6 + (0.8 * val))

        let innerRadius = width/2 - 34
        let outerRadius = width/2 - 14
        let dotRadius = (innerRadius + outerRadius) / 2

        let x1 = dotRadius * Math.cos(startPrecent - 3.14 / 2)
        let y1 = dotRadius * Math.sin(startPrecent - 3.14 / 2)

        let x2 = dotRadius * Math.cos(lastPrecent - 3.14 / 2)
        let y2 = dotRadius * Math.sin(lastPrecent - 3.14 / 2)  


        const svg = d3.select(svgRef)
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
        .attr("stop-color", "rgba(97, 107, 119, 1)")
        .attr("stop-opacity", 1);
        gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgba(153, 161, 169, 1)")
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

        svg.append("path")
            .attr("class", "arc-2")
            .attr("d", arcFront_path)
            .attr("fill", "url(#svgGradient)")
            .style("stroke-linecap","round")

        // svg.append("circle")
        //     .attr('cx', x1)
        //     .attr('cy', y1)
        //     .attr('r', 15)
        //     .attr('fill', 'white');
            
        svg.append("circle")
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', 15)
            .attr('fill', 'white');

        svg.append("text")
            .attr('cx', "50")
            .attr('cy', "500")
            .attr("class", "resultRoundGraphText")
            .attr('text-anchor','middle')
            .text(`${val * 100}%`);
    }



    return <div className="results">
        <h1 className="resultHead">YOUR SCORE</h1>

        
        <svg className="resultCircleGraph" ref={svgRef_1}></svg>
        <svg className="resultCircleGraph" ref={svgRef_2}></svg>
        <svg className="resultCircleGraph" ref={svgRef_3}></svg>
        {   
            results.map((result,index)=> {
                allExResults.push(result.value / 10)
                const precentAccuracy = result.accuracy.length > 0 ? Math.floor(result.accuracy.reduce((sum, elem)=>{return sum + elem}, 0) / result.accuracy.length) : 0
                console.log(results)
                return  (
                    <p className="resultElement" key={index}>{result.name}: <span 
                        style={{"color":'rgb(177, 63, 29)'}}>{result.value}({precentAccuracy}%)</span>
                    </p>
                )
            } )
        }
        
    </div>
}