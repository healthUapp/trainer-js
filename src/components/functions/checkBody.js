
export default function chackBody(poseLandmarks){
    let state = false 
    if(!poseLandmarks) {
        return false
    }
    
    if (poseLandmarks[11].visibility>0.7 && poseLandmarks[12].visibility>0.7 && poseLandmarks[28].visibility>0.5 && poseLandmarks[27].visibility>0.5 ){
        state=true
    }

    return state
}
