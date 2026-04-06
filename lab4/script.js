
function cmp(a, b, asc) {
    return asc ? a > b : a < b;
}

function prepare(arr) {
    let clean = [];
    let undefCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
            undefCount++;
        } else {
            clean.push(arr[i]);
        }
    }

    return { clean, undefCount };
}

// повертаємо undefined назад
function restore(arr, sorted, undefCount) {
    for (let i = 0; i < sorted.length; i++) {
        arr[i] = sorted[i];
    }
    for (let i = 0; i < undefCount; i++) {
        arr[sorted.length + i] = undefined;
    }
}

// красивий вивід у консоль
function printStats(name, comp, move, hasUndef) {
    console.log(`\n=== ${name} ===`);
    console.log(`Порівнянь: ${comp}`);
    console.log(`Переміщень: ${move}`);
    if (hasUndef) {
        console.log("undefined елементи переміщені в кінець");
    }
}

function bubbleSort(arr, asc = true) {
    let { clean, undefCount } = prepare(arr);
    let comp = 0, swap = 0;

    for (let i = 0; i < clean.length - 1; i++) {
        for (let j = 0; j < clean.length - i - 1; j++) {
            comp++;
            if (cmp(clean[j], clean[j + 1], asc)) {
                [clean[j], clean[j + 1]] = [clean[j + 1], clean[j]];
                swap++;
            }
        }
    }

    restore(arr, clean, undefCount);
    printStats("Bubble Sort", comp, swap, undefCount > 0);
    return arr;
}

function selectionSort(arr, asc = true) {
    let { clean, undefCount } = prepare(arr);
    let comp = 0, swap = 0;

    for (let i = 0; i < clean.length - 1; i++) {
        let idx = i;

        for (let j = i + 1; j < clean.length; j++) {
            comp++;
            if (cmp(clean[idx], clean[j], asc)) {
                idx = j;
            }
        }

        if (idx !== i) {
            [clean[i], clean[idx]] = [clean[idx], clean[i]];
            swap++;
        }
    }

    restore(arr, clean, undefCount);
    printStats("Selection Sort", comp, swap, undefCount > 0);
    return arr;
}

function insertionSort(arr, asc = true) {
    let { clean, undefCount } = prepare(arr);
    let comp = 0, move = 0;

    for (let i = 1; i < clean.length; i++) {
        let key = clean[i];
        let j = i - 1;

        while (j >= 0) {
            comp++;
            if (cmp(clean[j], key, asc)) {
                clean[j + 1] = clean[j];
                move++;
                j--;
            } else break;
        }

        clean[j + 1] = key;
    }

    restore(arr, clean, undefCount);
    printStats("Insertion Sort", comp, move, undefCount > 0);
    return arr;
}

function shellSort(arr, asc = true) {
    let { clean, undefCount } = prepare(arr);
    let comp = 0, move = 0;

    let gap = Math.floor(clean.length / 2);

    while (gap > 0) {
        for (let i = gap; i < clean.length; i++) {
            let temp = clean[i];
            let j = i;

            while (j >= gap) {
                comp++;
                if (cmp(clean[j - gap], temp, asc)) {
                    clean[j] = clean[j - gap];
                    move++;
                    j -= gap;
                } else break;
            }

            clean[j] = temp;
        }

        gap = Math.floor(gap / 2);
    }

    restore(arr, clean, undefCount);
    printStats("Shell Sort", comp, move, undefCount > 0);
    return arr;
}

function quickSort(arr, asc = true) {
    let { clean, undefCount } = prepare(arr);
    let comp = 0, swap = 0;

    function qs(a, left, right) {
        if (left >= right) return;

        let pivot = a[Math.floor((left + right) / 2)];
        let i = left;
        let j = right;

        while (i <= j) {
            while (asc ? a[i] < pivot : a[i] > pivot) {
                i++;
                comp++;
            }
            while (asc ? a[j] > pivot : a[j] < pivot) {
                j--;
                comp++;
            }

            if (i <= j) {
                [a[i], a[j]] = [a[j], a[i]];
                swap++;
                i++;
                j--;
            }
        }

        qs(a, left, j);
        qs(a, i, right);
    }

    qs(clean, 0, clean.length - 1);

    restore(arr, clean, undefCount);
    printStats("Quick Sort", comp, swap, undefCount > 0);
    return arr;
}


// ===== ДЕМОНСТРАЦІЯ =====

// звичайний масив
let arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));

console.log("🔹 Звичайний масив");
console.log("Початковий:", arr);


let b = bubbleSort([...arr]);
console.log("Bubble результат:", b);

let s = selectionSort([...arr]);
console.log("Selection результат:", s)

let i = insertionSort([...arr]);
console.log("Insertion результат:", i);

let sh = shellSort([...arr]);
console.log("Shell результат:", sh);

let q = quickSort([...arr]);
console.log("Quick результат:", q);

// розріджений масив
let sparse = [];
for (let i = 0; i < 100; i++) {
    sparse[i] = (i % 10 === 0) ? undefined : Math.floor(Math.random() * 100);
}

console.log("\n🔹 Розріджений масив");
console.log("Початковий:", sparse);

let b2 = bubbleSort([...sparse], false);
console.log("Bubble результат:", b2);

let s2 = selectionSort([...sparse], false);
console.log("Selection результат:", s2);

let i2 = insertionSort([...sparse], false);
console.log("Insertion результат:", i2);

let sh2 = shellSort([...sparse], false);
console.log("Shell результат:", sh2);

let q2 = quickSort([...sparse], false);
console.log("Quick результат:", q2);
