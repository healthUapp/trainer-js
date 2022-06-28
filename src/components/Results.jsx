import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Results({results, accuracy}){


    



    return <div className="results">
        <h1 className="resultHead">YOUR SCORE</h1>
        {
            results.map((result,index)=> {
                let precent = Math.floor(accuracy.reduce((sum, elem)=>{return sum + elem}, 0) / accuracy.length)
                
                return  (
                    <p className="resultElement" key={index}>{result.name}: <span 
                        style={{"color":'rgb(177, 63, 29)'}}>{result.value}({precent}%)</span>
                    </p>
                )
            } )
        }
        
    </div>
}