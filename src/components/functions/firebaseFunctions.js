import { database } from '../../firebase'
import { ref, child, get, set } from "firebase/database";



export const getData = () => {
    const dbRef = ref(database)
    get(child(dbRef, `results/`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.val()
        } else {
            console.log("no have data")
        }
    }).catch((error) => {
        console.error(error)
    })
}


export const sendData = (value) => {
    set(ref(database, 'results/'), value);
        // database.ref('results').push(value)
        // ref('results').push(value)
}



