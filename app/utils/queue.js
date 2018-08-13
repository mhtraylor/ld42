export default function (data = []) {
    const queue = data

    return {
        enqueue     : (x) => queue.push(x),
        dequeue     : () => queue.shift(),
        head        : () => queue[0],
        last        : () => queue[queue.length - 1],
        isEmpty     : () => queue.length === 0,
        size        : () => queue.length,
        get queue() {
            return queue
        }
    }
}