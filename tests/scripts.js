async function init() {
    console.log(1);
    await sleep(1000);
    console.log(2);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


const k = [1,2,3,4,5,6,7,8,9];

console.log(k.slice(-5))
