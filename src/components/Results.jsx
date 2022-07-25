import { useRef,useState, useEffect } from "react";
import * as d3 from "d3";
import { svg } from "d3";

import { useDispatch, useSelector } from "react-redux";
import { setCourceIndex, setSetIndex, setShowResults } from "store/slices/appSlice";

//SVG
import cheked from 'assets/svg/cheked.svg'
import uncheked from 'assets/svg/uncheked.svg'
import home from 'assets/svg/home.svg'
import dumbbell from 'assets/svg/dumbbell.svg'
import calender from 'assets/svg/calender.svg'
import graph from 'assets/svg/graph.svg'
import dumbbell_active from 'assets/svg/dumbbell_active.svg'
import calender_active from 'assets/svg/calender_active.svg'
import graph_active from 'assets/svg/graph_active.svg'

export default function Results({back}){

    const dispatch = useDispatch()

    const reduxAppState = useSelector(state => state.app)
    const reduxUserState = useSelector(state => state.user)

    const trainerData = reduxAppState.data

    const results = reduxUserState.results
    const chosenSetIndex = reduxAppState.chosenSetIndex
    const chosenCourceIndex = reduxAppState.chosenCourceIndex
    const selectedCource = trainerData.allCources[chosenCourceIndex]

    const allSets = trainerData.allSets
    const allCources = trainerData.allCources
    const allDays = trainerData.allDays
    const allExercises = trainerData.allExercises
    const allSetsNames = trainerData.allSetsNames

    const chosenCource = allCources[chosenCourceIndex]
    const chosenSet = allSets[chosenSetIndex]

    const [selectedPage, setSelectedPage] = useState(2)
    const [selectedSetIndex, setSelectedSetIndex] = useState(0)
    const [todayResults, setTodayResults] = useState(null)
    const [resultsOfDays ,setResultsOfDays] = useState([])
    const [circleBoxWidth, setcircleBoxWidth] = useState(0)
    const [todayUncompletedSetsIndexes ,setTodayUncompletedSetsIndexes] = useState([])
    const [rerenderCounter, setRerenderCounter] = useState(0)
    const formatOfDate = {day: "numeric", month: "numeric", year: "numeric"}
    const dateNow = new Date().toLocaleString('ru', formatOfDate)

    const svgRef_0 = useRef(null)
    const svgRef_1 = useRef(null)
    const svgRef_2 = useRef(null)
    const svgRef_3 = useRef(null)
    const svgRef_4 = useRef(null)

    useEffect(()=>{
        console.log("Cource index: ",chosenCourceIndex,"Set index: ", chosenSetIndex,"........................")
        let allResults = JSON.parse(localStorage.getItem('results'))
        if (allResults) {
        allResults.push(results)
        setResultsOfDays(allResults)
        }

        let delay = setTimeout(()=>{
            setRerenderCounter(rerenderCounter + 1)
            clearTimeout(delay)
        },1000)
    },[rerenderCounter])

    useEffect(()=>{
        
        if(resultsOfDays){
            let todaysResultsArray = []

            resultsOfDays.map((result,rIndex) => {
                const resultDate = new Date(result.date).toLocaleString('ru', formatOfDate)
                if(resultDate === dateNow && result.results.length > 0){
                    let indexOfSet = todaysResultsArray.map(v => v.indexOfSet).indexOf(result.indexOfSet)
                    if(indexOfSet === -1){
                        todaysResultsArray.push(result)
                    } else {
                        let length1 = result.results.map(v => v.accuracy.length).reduce((a,b) => a + b , 0)
                        let length2 = todaysResultsArray[indexOfSet].results.map(v => v.accuracy.length).reduce((a,b) => a + b , 0)
                        
                        if(length1 > length2){
                            console.log('Замена сета',length1,'>',length2)
                            todaysResultsArray.push(result)
                            todaysResultsArray.splice(indexOfSet, 1)
                        }else {
                            console.log('Есть сет получше',length2,'>',length1)
                        }

                        
                    }
                    
                }
            });
            console.log(todaysResultsArray)

            setTodayResults(todaysResultsArray)
        }
    },[resultsOfDays])

    useEffect(()=>{
        if(todayResults && todayResults.length > 0) {

            let todayAccuracy = Math.round(
                (todayResults.map(todayResult => {
                    let accuracy = todayResult.results.map((results)=> {
                        if(results.value > 0) {
                            return (results.accuracy.reduce((a,b) => a+b, 0) / results.accuracy.length)
                        } else return 0
                    })
                    
                    if(accuracy.length > 1) {
                        return (accuracy.reduce((a,b) => a+b, 0) / accuracy.length)
                    } else return 0
                }).reduce((a,b) => a+b, 0) / todayResults.length)
            );

            let todayTime = todayResults.map(todayResult => {
                    let time = todayResult.results.map(result => {
                        if(result.value > 0) {
                            return result.time
                        } else return 0
                    })
                    return time.reduce((a,b) => a+b, 0)
            }).reduce((a,b) => a+b, 0);
            
            let allTime = selectedCource.map(index => {
                if(trainerData) {
                    let time = trainerData.allSets[index].map(v => {
                        return v.time
                    })
                    return time.reduce((a,b) => a+b, 0)
                }
            }).reduce((a,b) => a+b, 0);

            setTodayUncompletedSetsIndexes(selectedCource.filter(n => todayResults.map(todayResult => {
                return todayResult.indexOfSet
            }).indexOf(n) === -1))

            let completedExercises =  todayResults.map(todayResult => {
                let exercises = todayResult.results.map(result => {
                    if(result.value > 0) {
                        return 1
                    } else return 0
                })
                return exercises.reduce((a,b) => a+b, 0)
            }).reduce((a,b) => a+b, 0);

            let allExercises = selectedCource.map(index => {
                if(trainerData) {
                    return trainerData.allSets[index].length
                }
            }).reduce((a,b) => a+b, 0);

            svgRef_1.current && drawCircleGraph( completedExercises, allExercises, "Exercises", "rgba(174, 237, 228, 1)", "rgba(163, 220, 239, 1)", svgRef_1.current, 0)
            svgRef_2.current && drawCircleGraph( todayTime, allTime, "Time", "rgba(249, 155, 181, 1)", "rgba(255, 248, 182, 0.9)", svgRef_2.current , 1)
            svgRef_3.current && drawCircleGraph( (todayAccuracy? todayAccuracy : 0), 100,  "Accuracy", "rgba(149, 136, 246, 1)", "rgba(204, 238, 212, 1)", svgRef_3.current, 2)
            svgRef_4.current && drawGraph(todayResults,  "Accuracy performance, %" , svgRef_4.current)
            console.log("........................")
        }

    },[todayResults,selectedCource, circleBoxWidth, rerenderCounter])

    const drawGraph = (resultsData, text, svgRef) => {

        let colors = ['rgba(155,157,234,1)','rgba(247,160,181,1)','rgba(204,238,212,1)','rgba(238, 221, 204 ,1)','rgba(238, 204, 214 ,1)','#000','#500']

        let charts = []

        if(resultsData.length > 0){
            resultsData.forEach((v,i)=>{
                charts.push({
                    data: v.results.map((result)=>result.accuracy.filter(e => e > 50)).flat(),
                    color: colors[v.indexOfSet]
                })
            })
        }
        console.log(charts)

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
            .text(text)
            .attr('text-anchor', 'left')
            .attr('class', 'graphText')



        const yScale = d3.scaleLinear()
            .domain([60, 100])
            .range([height - 70, 80])

        const yAxis = d3.axisLeft(yScale)
            .ticks(4)
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
        }

        resultsData.forEach((result, index)=>{
            let x = [58,158,258]

            svg.append('text')
                .attr('x', x[index])
                .attr('y', 230)
                .text(`${index + 1}st set`)
                .attr('text-anchor', 'left')
                .attr('class', 'grapLegendText')

            svg.append('line')
                .attr('x1', x[index] - 22)
                .attr('y1', 227)
                .attr('x2', x[index] - 5)
                .attr('y2', 227)
                .attr('stroke', colors[index])
                .attr('stroke-width', '2.5px')
                .attr('stroke-linecap', 'round')


        })

    }

    const drawCircleGraph = (val1, val2, text, grColorStart, grColorEnd, svgRef, id) => {
        let width = (svgRef_0.current.clientWidth - 20)/ 4

        if(svgRef.clientWidth){
            if  (id === 1) {
                width = (svgRef_0.current.clientWidth / 3) + 20
            }
        }
        
        let val = Math.round((val1 / val2) * 10) / 10
        let startPrecent = 3.14
        let lastPrecent = 6.28 * (0.52 + val)
        let innerRadius = id === 1 ? width/2 - 42 : width/2 - 36
        let outerRadius = id === 1 ? width/2 - 20 : width/2 - 16
        let middleRadius = (innerRadius + outerRadius) / 2
        let dotRadius = (outerRadius - innerRadius) / 2

        let x1 = middleRadius * Math.cos(startPrecent - 3.14 / 2)
        let y1 = middleRadius * Math.sin(startPrecent - 3.14 / 2)

        let x2 = middleRadius * Math.cos((lastPrecent - 0.1)  - 3.14 / 2)
        let y2 = middleRadius * Math.sin((lastPrecent - 0.1) - 3.14 / 2)  

        const svg = d3.select(svgRef).html(null)
            .attr('width', `${width}px`)
            .attr('height', `${width + 20}px`)
                .append("g")
                .attr("transform", `translate(${width/2},${width/2})`)

        var defs = svg.append("defs");

        var gradient = defs.append("linearGradient")
        .attr("id", `svgGradient-${id}`)
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
            .startAngle(Math.PI)
            .endAngle(Math.PI * 3);
        
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
            .attr("fill", `url(#svgGradient-${id})`)
        

        svg.append("circle")
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', width/60)
            .attr('fill', 'black')
            

        svg.append("circle")
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', innerRadius - 7)
            .attr('fill', 'none')
            .attr('stroke', '#8675FF')
            .attr('stroke-width','0.53px')
            .attr('stroke-dasharray', "2 10")
            .attr('stroke-dashoffset', 5)
            .attr('stroke-linecap', 'round')
            .attr('stroke', 'black')


        svg.append("text")
            .attr('x', 0)
            .attr('y', -10)
            .text(text)
            .attr('text-anchor', 'middle')
            .attr('class', `'circleText'`)
            .style('font-size', `${width/14}px`)




        let svgText;
        
        switch (text) {
            case "Time":
                svgText = `${Math.floor((val1 + 20) / 60)} min ${Math.floor((val1 + 20) / 60) % 60 > 0 ? `${(val1 + 20) % 60} s` : ""}`
                break;
            case "Exercises":
                svgText = `${val1} / ${val2}`
                break;
            case "Accuracy":
                svgText = `${Math.round(val * 100)}%`
                break;
        
            default:
                break;
        }

        svg.append("text")
            .attr('x', 0)
            .attr('y', width/12)
            .attr("class", "resultRoundGraphText")
            .attr('text-anchor','middle')
            .text(svgText)
            .style('font-size', `${width/12}px`)

    }

    const dumbbellPage = () => {
        return (
            <>
                <div className="results_days">
                    <div className="results_activitesText">
                        <h1>{allDays.names[chosenCourceIndex]}</h1>
                        <p className="resultsActivites"><span className="resultsActivites-1">{3 - todayUncompletedSetsIndexes.length}</span><span className="resultsActivites-2">/{3}</span> activites</p>
                    </div>
                    <div className="cardBoxList">
                        {
                            chosenCource.map((setIndex, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className="resultCard"

                                            onClick={() => { 
                                                // setChosenSet(allSets[setIndex]);
                                                // setChosenSetIndex(setIndex);
                                                setSelectedSetIndex(setIndex)
                                                // dispatch(setSetIndex({index:setIndex}));
                                                // dispatch(setShowResults({status: false}));
                                            }}
                                        >
                                            <div className ='checkSvgBox'>
                                                {todayUncompletedSetsIndexes.indexOf(index) !== -1 
                                                    ?   <img src={uncheked} />
                                                    :   <img src={cheked} />
                                                }
                                            </div>
                                            <div className='resultCardImgBox'>
                                                <img className='resultCardImg' src={allDays.images[index]} />
                                            </div>

                                            <div className={`resultCardText`} >
                                                <h5 className='resultCardHighText'>{`${allSetsNames[index]}`}</h5>
                                                <div className='resultCardTextBox'>
                                                    {/* <p className='cardLowerText-1'>{setsTimes[chosenCource[index]] ? `${Math.floor(courcesTimes[index] / 60)} min. ${(courcesTimes[index] % 60) > 0 ? (`${courcesTimes[index] % 60}s.`) : ""}` : "0 s."}</p> */}
                                                    <p className='cardLowerText-2'>{allSets[setIndex] ? allSets[setIndex].length : 0} ex.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="exercisesPreview results">
                            {(chosenSet !== null) &&
                                <>
                                    <div className="prewivwResultHeader">
                                        <h2>{allSetsNames[selectedSetIndex]}</h2>
                                        <p>exercises</p>
                                    </div>
                                    <div className="exercisesPreviewList results">
                                        {allSets[selectedSetIndex].map((ex, index) => (
                                            <div key={index} className='exercisePrewiew__item results'>
                                                {/* <ReactFreezeframe src={allExercises[ex.exerciseIndex].gif} /> */}
                                                {/*<iframe width="264px" src={allExercises[ex.exerciseIndex].mp4} type="video/mp4" />*/}
                                                <video src={allExercises[ex.exerciseIndex].mp4}  width="267px" className="vidPunch" autoPlay={true} loop={true} muted />
                                                <h4>{allExercises[ex.exerciseIndex].name}</h4>
                                                <h5>{ex.time} sec</h5>
                                            </div>
                                        ))}

                                    </div>
                                </>
                            }

                </div>
            </>
        )
    }

    const graphsPage = () => {
        return (
            <div className="results_graphs">
                
                <h1 className="resultHead">THAT'S A GOOD START! <br/> KEEP IT UP! </h1>                
                <div className="results_graph_scroll">
                    <div className="resultCircleGraphBox"  ref={svgRef_0}>
                        <svg className="resultCircleGraph gr-1" ref={svgRef_1}></svg>
                        <svg className="resultCircleGraph gr-2" ref={svgRef_2}></svg>
                        <svg className="resultCircleGraph gr-3" ref={svgRef_3}></svg>
                    </div>
                    <svg className="resultGraph" ref={svgRef_4}></svg>
                </div>

            </div> 
        )
    }

    const calenderPage = () => (
        <div className="calender">
                
                <h1 className="resultHead">Activity plan</h1>                
                <div className="calender_inner">
                    <div className="week">
                        <div className="week_name">Week 1</div>
                        <div className="week_cards">
                        {
                            allCources.map((cource, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={`card ${index > 4 ? "blocked results" : ""}`}

                                            onClick={() => { if(index <= 4) {
                                                // setChosenCource(cource);
                                                // dispatch(setCourceIndex({index: index}))
                                                // dispatch(setSetIndex({index: 0}))
                                                // setChosenSet(allSets[0]);
                                                // setChosenSetIndex(0)
                                            } else console.log('blocked') }}
                                        >
                                            <div className='cardImgBox'>
                                                <img className='cardImg' src={allDays.images[index]} />
                                            </div>

                                            <div className={`cardText ${index > 0 ? "blocked" : ""}`} >
                                                {index < 5 &&

                                                    <>
                                                        <h5 className='cardHighText'>{allDays.names[index]}</h5>

                                                        <div className='cardLowerTextBox'>
                                                            <p className='cardLowerText-2'>{cource.length} activities</p>
                                                        </div>
                                                    </>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="week">
                        <div className="week_name">Week 2</div>
                        <div className="week_cards">
                        {
                            allCources.map((cource, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={`card ${index > 4 ? "blocked results" : ""}`}

                                            onClick={() => { if(index <= 4) {
                                                // setChosenCource(cource);
                                                // dispatch(setCourceIndex({index: index}))
                                                // dispatch(setSetIndex({index: 0}))
                                                // setChosenSet(allSets[0]);
                                                // setChosenSetIndex(0)
                                            } else console.log('blocked') }}
                                        >
                                            <div className='cardImgBox'>
                                                <img className='cardImg' src={allDays.images[index]} />
                                            </div>

                                            <div className={`cardText ${index > 0 ? "blocked" : ""}`} >
                                                {index < 5 &&

                                                    <>
                                                        <h5 className='cardHighText'>{allDays.names[index]}</h5>

                                                        <div className='cardLowerTextBox'>
                                                            <p className='cardLowerText-2'>{cource.length} activities</p>
                                                        </div>
                                                    </>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="week">
                        <div className="week_name">Week 3</div>
                        <div className="week_cards">
                        {
                            allCources.map((cource, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={`card ${index > 4 ? "blocked results" : ""}`}

                                            onClick={() => { if(index <= 4) {
                                                // setChosenCource(cource);
                                                // dispatch(setCourceIndex({index: index}))
                                                // dispatch(setSetIndex({index: 0}))
                                                // setChosenSet(allSets[0]);
                                                // setChosenSetIndex(0)
                                            } else console.log('blocked') }}
                                        >
                                            <div className='cardImgBox'>
                                                <img className='cardImg' src={allDays.images[index]} />
                                            </div>

                                            <div className={`cardText ${index > 0 ? "blocked" : ""}`} >
                                                {index < 5 &&

                                                    <>
                                                        <h5 className='cardHighText'>{allDays.names[index]}</h5>

                                                        <div className='cardLowerTextBox'>
                                                            <p className='cardLowerText-2'>{cource.length} activities</p>
                                                        </div>
                                                    </>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
        </div> 
    )

    return <div className="results_page">
        <div className="results_background"></div>

        <div className="results_header">
            <div><p>DEMO</p></div>
        </div>
        <div className="results_box">
            <div className="results_menu">
                <img src={home} alt="" onClick={()=>back()}/>
                <img src={selectedPage===1? dumbbell_active : dumbbell} alt="" onClick={()=>setSelectedPage(1)}/>
                <img src={selectedPage===2? graph_active: graph} alt="" onClick={()=>setSelectedPage(2)}/>
                <img src={selectedPage===3? calender_active : calender} alt="" onClick={()=>setSelectedPage(3)}/>
            </div>
            {selectedPage === 1 && dumbbellPage()}
            {selectedPage === 2 && graphsPage()}
            {selectedPage === 3 && calenderPage()}
        </div>
    </div>
    
}