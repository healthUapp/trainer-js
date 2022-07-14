import { useRef,useState, useEffect } from "react";
import { database } from '../firebase'
import { ref, child, get } from "firebase/database";
import * as d3 from "d3";
import { svg } from "d3";



export default function Results({allSets, selectedCource, results, showResults}){

    const [renderInterval, setRenderInterval] = useState(0)
    const [todayResults, setTodayResults] = useState(null)
    const [resultsOfDays ,setResultsOfDays] = useState([])
    const formatOfDate = {day: "numeric", month: "numeric", year: "numeric"}
    const dateNow = new Date().toLocaleString('ru', formatOfDate)

    const svgRef_1 = useRef(null)
    const svgRef_2 = useRef(null)
    const svgRef_3 = useRef(null)
    const svgRef_4 = useRef(null)

    
    const width = 250

    

    useEffect(()=>{
        const dbRef = ref(database)
        get(child(dbRef, `exercises/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
            } else {
                console.log("no have data")
            }
        }).catch((error) => {
            console.error(error)
        })
        let allResults = JSON.parse(localStorage.getItem('results'))
        if (allResults) {
        allResults.push(results)
        console.log(allResults)
        setResultsOfDays(allResults)
        }
    },[])

    useEffect(()=>{
        if(resultsOfDays){
            let todaysResultsArray = []
        
            resultsOfDays.map(result => {
                const resultDate = new Date(result.date).toLocaleString('ru', formatOfDate)
                if(resultDate === dateNow){
                    console.log(result)
                    todaysResultsArray.push(result)
                }
            });
            setTodayResults(todaysResultsArray)
        }
    },[resultsOfDays])


    useEffect(()=>{
        if(todayResults) {
            console.log(todayResults)

            let todayAccuracy = Math.round(
                (todayResults.map(todayResult => {
                    let accuracy = todayResult.results.map((results)=> {
                        if(results.accuracy.length > 0) {
                            return (results.accuracy.reduce((a,b) => a+b, 0) / results.accuracy.length)
                        } else return 0
                    })
                    console.log(accuracy)
                    
                    if(accuracy.length > 0) {
                        return (accuracy.reduce((a,b) => a+b, 0) / accuracy.length)
                    } else return 0
                }).reduce((a,b) => a+b, 0) / todayResults.length)
            );

            let todayCompletedExercises = todayResults.map(todayResult => {
                return todayResult.results.map((results)=>{
                    return results.value
                }).reduce((a,b) => a+b, 0)
            }).reduce((a,b) => a+b, 0);
            
            console.log(todayResults)

            let todayUnompletedSets = selectedCource.filter(n => todayResults.map(todayResult => {
                return todayResult.indexOfSet
            }).indexOf(n) === -1);
            

            console.log(todayCompletedExercises)
            console.log(todayUnompletedSets)
            console.log(todayAccuracy)
            console.log(selectedCource)
            

            
                drawCircleGraph( Math.round(( (selectedCource.length - todayUnompletedSets.length) / selectedCource.length) * 100) / 100, "Sets", "rgba(174, 237, 228, 1)", "rgba(163, 220, 239, 1)", svgRef_1.current)
                drawCircleGraph( (todayCompletedExercises) / 1000, "Repeats", "rgba(249, 155, 181, 1)", "rgba(255, 248, 182, 0.9)", svgRef_2.current)
                drawCircleGraph( (todayAccuracy? todayAccuracy : 0)/100,  "Accuracy", "rgba(149, 136, 246, 1)", "rgba(204, 238, 212, 1)", svgRef_3.current)
                drawGraph( todayResults,  "Accuracy performance, %" , svgRef_4.current)
        }
        let delay = setTimeout(()=>{setRenderInterval(renderInterval + 1); clearTimeout(delay)}, 500)
    },[todayResults, results, renderInterval])

    const drawGraph = (resultsData, text, svgRef) => {

        console.log(resultsData)
        resultsData = []

        let colors = ['rgba(155,157,234,1)','rgba(247,160,181,1)','rgba(204,238,212,1)','rgba(155,157,234,1)','rgba(247,160,181,1)','rgba(204,238,212,1)','rgba(155,157,234,1)','rgba(247,160,181,1)','rgba(204,238,212,1)']

        let accuracy = [];

        let charts = [];

        if(resultsData.length > 0){
            accuracy = resultsData[0].results.map((result)=>{
                return result.accuracy.map((val) => val)
            }).flat()

            

            console.log(accuracy)

            accuracy.forEach((a,i)=>{
                charts.push({
                    data: a,
                    color: colors[i]
                })
            })
        }

        let data1 = [100,90,80,72,32]
        let data2 = [0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,6,30,60,80,100]
        let data3 = [29,45,82,75,23,23,11,5,23,88,77]


        const margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = svgRef.clientWidth - margin.left - margin.right,
        height = svgRef.clientHeight - margin.top - margin.bottom;

        // Очистка предыдущего кадра
        const svg = d3.select(svgRef).html(null) 
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${0},${0})`)
            .style('overflow', 'visivle')
        
        svg.append('text')
            .attr('x', 25)
            .attr('y', 40)
            .text("Accuracy preformance, %")
            .attr('text-anchor', 'left')
            .attr('class', 'graphText')


        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - 60, 70])

        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickPadding([20])
            .tickSize(width - 90)



        svg.append('g')
            .call(yAxis)
            .attr('transform', `translate(${width - 30},${0})`)
            .attr('opacity', 1)

        d3.selectAll('g.tick')
            .attr('opacity', '1')
            .attr('stroke-width', 1)

        d3.selectAll('path.domain')
            .attr('display', 'none')


        if (charts.length > 0) {
            charts.forEach(chart => drawLine(chart))
        }

        function drawLine( chart ) {
            const data = chart.data
            const color = chart.color

            const xScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([60, width - 30])

            const generateScaledLine = d3.line()
                .x((d,i) => xScale(i))
                .y(yScale)
                .curve(d3.curveBasis)

            svg.selectAll('.line')
                .data([data])
                .join('path')
                    .attr('d', d => generateScaledLine(d))
                    .attr('fill', 'none')
                    .attr('stroke', color)
                    .attr('stroke-width', 3)
            // svg.append('rect')
            //     .attr('x', 0)
            //     .attr('y', 0)
            //     .attr('width',100)
            //     .attr('height',100)
            //     .attr('fill', 'red')
        }












    }

    const drawCircleGraph = (val, text, grColorStart, grColorEnd, svgRef) => {
        let startPrecent = 6.28  * 0.6
        let lastPrecent = 6.28 * (0.6 + (0.8 * val))
        let thisWidth = text === "Repeats" ? width + 30 : width
        let innerRadius = text === "Repeats" ? thisWidth/2 - 37 : thisWidth/2 - 34
        let outerRadius = text === "Repeats" ? thisWidth/2 - 12 : thisWidth/2 - 14
        let middleRadius = (innerRadius + outerRadius) / 2
        let dotRadius = (outerRadius - innerRadius) / 2

        let x1 = middleRadius * Math.cos(startPrecent - 3.14 / 2)
        let y1 = middleRadius * Math.sin(startPrecent - 3.14 / 2)

        let x2 = middleRadius * Math.cos(lastPrecent  - 3.14 / 2)
        let y2 = middleRadius * Math.sin(lastPrecent  - 3.14 / 2)  

        const svg = d3.select(svgRef)
            .html(null)
            .append("g")
            .attr("transform", `translate(${thisWidth/2},${thisWidth/2})`)

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
            .attr('y', -30)
            .text(text)
            .attr('text-anchor', 'middle')
            .attr('class', 'circleText');
            

        let svgText;
        
        switch (text) {
            case "Repeats":
                svgText = `${val * 1000}/1k`
                break;
            case "Sets":
                svgText = `${Math.round(val * 100)}%`
                break;
            case "Accuracy":
                svgText = `${Math.round(val * 100)}%`
                break;
        
            default:
                break;
        }

        svg.append("text")
            .attr('x', 0)
            .attr('y', 30)
            .attr("class", "resultRoundGraphText")
            .attr('text-anchor','middle')
            .text(svgText);

    }




    return <div className="results">
        <h1 className="resultHead">{"your score for the day".toUpperCase()}</h1>
        <h6 className="resultHead-bottom">{new Date().toLocaleString('ru',{month:"numeric",day:"numeric", year: "numeric", minute: "2-digit", hour: "2-digit"})}</h6>

        
        <div className="resultCircleGraphBox">
            <svg className="resultCircleGraph gr-1" ref={svgRef_1}></svg>
            <svg className="resultCircleGraph gr-2" ref={svgRef_2}></svg>
            <svg className="resultCircleGraph gr-3" ref={svgRef_3}></svg>
        </div>
        <svg className="resultGraph" ref={svgRef_4}></svg>

    </div>
    
}