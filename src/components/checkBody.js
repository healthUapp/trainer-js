
export default function chackBody(poseLandmarks){
    let state = false 
    if (poseLandmarks[11].visibility>0.8 && poseLandmarks[12].visibility>0.8 && poseLandmarks[28].visibility>0.9 && poseLandmarks[27].visibility>0.9 ){
        state=true
    }
    return state
}
