export default function findRotation(a: number, b: number, poseLandmarks: any) {

    if (!poseLandmarks) { return null }

    const p1 = [poseLandmarks[a]?.x, poseLandmarks[a]?.y, poseLandmarks[a]?.z]
    const p2 = [poseLandmarks[b]?.x, poseLandmarks[b]?.y, poseLandmarks[b]?.z]

    function radians_to_degrees(radians: number) {
        return radians * (180 / Math.PI);
    }

    function arctan(p1: any[], p2: any[]) {
        let delta_x = p1[0] - p2[0]
        let delta_y = p1[1] - p2[1]
        return Math.atan(delta_y / delta_x)
    }

    const angle = radians_to_degrees(arctan(p1, p2))


    return angle
}