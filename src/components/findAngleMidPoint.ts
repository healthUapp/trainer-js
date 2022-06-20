export default function findAngleMidPoint(a:number, b:number, c:number, d:number, poseLandmarks: any) {

    //a,b - точки для которых нужно найти середину
    //с,d - точки для подсчёта углов
    //находим середину между точками,затем считаем угол между серединой и двумя другими точками
    if(!poseLandmarks) {return null}

    const dot1 = [poseLandmarks[a]?.x, poseLandmarks[a]?.y, poseLandmarks[a]?.z]
    const dot2 = [poseLandmarks[b]?.x, poseLandmarks[b]?.y, poseLandmarks[b]?.z]

    function findMid(p1: any[], p2: any[]) {
        let one = (p1[0] + p2[0])/2
        let two = (p1[1] + p2[1])/2
        return [one,two]
    }

    const mid_point = findMid(dot1,dot2)//середина между точками a,b

    

    const p1 = [poseLandmarks[c]?.x, poseLandmarks[c]?.y]
    const p2 = mid_point
    const p3 = [poseLandmarks[d]?.x, poseLandmarks[d]?.y]

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