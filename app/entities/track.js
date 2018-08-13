function cursor(data = []) {
    return (function *(data = []) {
        let t = -1, n = data[0], c = null
        while (data && data.length > -1) {
            if (n.beat === t) {
              c = n
              n = data ? data.shift() : n

            }
            t = yield c
        }
    })(data)
}


export default class Track {

    constructor(data = []) {

    }
}