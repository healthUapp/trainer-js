export default function findRadius(a:number, b:number, poseLandmarks: any) {

    if(!poseLandmarks) {return null}

    const p1 = [poseLandmarks[a]?.x, poseLandmarks[a]?.y, poseLandmarks[a]?.z]
    const p2 = [poseLandmarks[b]?.x, poseLandmarks[b]?.y, poseLandmarks[b]?.z]
   

  
    function dist(p1: any[], p2: any[]) {
        let one = Math.pow(p1[0] - p2[0], 2)
        let two = Math.pow(p1[1] - p2[1], 2)
        return Math.sqrt(one + two)
    }

    const radius = dist(p1, p2);

    return radius
}