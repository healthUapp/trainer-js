export default function comparePoint(a:number, b:number, poseLandmarks: any) {

    if(!poseLandmarks) {return null}

    const p1 = [poseLandmarks[a]?.x, poseLandmarks[a]?.y, poseLandmarks[a]?.z]
    const p2 = [poseLandmarks[b]?.x, poseLandmarks[b]?.y, poseLandmarks[b]?.z]

    
    function compare(p1: any[], p2: any[]) {
        let point_1=p1[1]
        let point_2=p2[1]
        let comparation=""
        if (point_1>point_2){
            comparation="True"
        }
        else {
            comparation="False"
        }
        return comparation 
        }
      
    const pt=compare(p1,p2)

    return pt;

}