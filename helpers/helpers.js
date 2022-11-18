

export function parseRegisters (array) {
    let total = 0;
    for (let i = 0; i < array.length; i++){
        const {value, type} = array[i];
        total += parseFloat(value) * (type === 'in'? 1 : -1);
    }
    return total.toFixed(2);
}