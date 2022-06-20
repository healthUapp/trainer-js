export default function midPoint(a:number, b:number, c:number, poseLandmarks: any) {

    if(!poseLandmarks) {return null}

    const p1 = [poseLandmarks[a]?.x, poseLandmarks[a]?.y, poseLandmarks[a]?.z]
    const p2 = [poseLandmarks[b]?.x, poseLandmarks[b]?.y, poseLandmarks[b]?.z]

    function dist(p1: any[], p2: any[]) {
        let one = (p1[0] + p2[0])/2
        let two = (p1[1] + p2[1])/2
        return [one,two]
    }

    const mid_point=dist(p1,p2)
    return mid_point
}