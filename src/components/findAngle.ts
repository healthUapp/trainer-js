export default function findAngle(a:number, b:number, c:number, poseLandmarks: any) {

    if(!poseLandmarks) {return null}

    const p1 = [poseLandmarks[a]?.x, poseLandmarks[a]?.y, poseLandmarks[a]?.z]
    const p2 = [poseLandmarks[b]?.x, poseLandmarks[b]?.y, poseLandmarks[b]?.z]
    const p3 = [poseLandmarks[c]?.x, poseLandmarks[c]?.y, poseLandmarks[c]?.z]

    function radians_to_degrees(radians: number) {
        return radians * (180 / Math.PI);
    }
    function dist(p1: any[], p2: any[]) {
        let one = Math.pow(p1[0] - p2[0], 2)
        let two = Math.pow(p1[1] - p2[1], 2)
        return Math.sqrt(one + two)
    }

    const ab = dist(p1, p2);
    const bc = dist(p2, p3);
    const ac = dist(p1, p3);

    const angle = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * ab * bc);

    return radians_to_degrees(Math.acos(angle));
}