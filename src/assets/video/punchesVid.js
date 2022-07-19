import punchesmp4 from '../gif/punches.mp4'


const videoTag = () => {
    return (
        <>
            <video width="267px" className="vidPunch" autoPlay={true} loop={true} muted>
                <source src={punchesmp4} type="video/mp4"/>
            </video>
        </>
    )
}


export default videoTag

// export const punchVid = punchesmp4