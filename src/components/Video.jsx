import React from "react";
import videoFon from '../assets/video/video.mp4'
import '../App.css'


const Video = () => {

    return (
        <>
            <div className={'videoWrapper'}>
                <video className={'videoFirst'}  controls  autoPlay loop muted>
                    <source src={videoFon} type="video/mp4"/>
                </video>
            </div>
        </>
    )
}

export default Video;


