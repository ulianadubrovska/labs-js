// прості функції сортування

// перевірка для asc / desc
function cmp(a, b, asc) {
    return asc ? a > b : a < b;
}

// прибираємо undefined
function clearArr(arr) {
    let res = [];
    let hasUndef = false;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
            hasUndef = true;
        } else {
            res.push(arr[i]);
        }
    }

    if (hasUndef) {
        console.log("є undefined елементи");
    }

    return res;
}

// 1. бульбашка
function bubbleSort(arr, asc = true) {
    let a = clearArr(arr.slice());
    let comp = 0, swap = 0;

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - 1; j++) {
            comp++;
            if (cmp(a[j], a[j + 1], asc)) {
                let t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
                swap++;
            }
        }
    }

    console.log("bubble:", comp, swap);
    return a;
}

// 2. вибір мінімального
function selectionSort(arr, asc = true) {
    let a = clearArr(arr.slice());
    let comp = 0, swap = 0;

    for (let i = 0; i < a.length; i++) {
        let min = i;

        for (let j = i + 1; j < a.length; j++) {
            comp++;
            if (cmp(a[min], a[j], asc)) {
                min = j;
            }
        }

        if (min !== i) {
            let t = a[i];
            a[i] = a[min];
            a[min] = t;
            swap++;
        }
    }

    console.log("selection:", comp, swap);
    return a;
}

// 3. вставки
function insertionSort(arr, asc = true) {
    let a = clearArr(arr.slice());
    let comp = 0, move = 0;

    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;

        while (j >= 0 && cmp(a[j], key, asc)) {
            comp++;
            a[j + 1] = a[j];
            move++;
            j--;
        }

        a[j + 1] = key;
    }

    console.log("insertion:", comp, move);
    return a;
}

// 4. шелл
function shellSort(arr, asc = true) {
    let a = clearArr(arr.slice());
    let comp = 0;

    let gap = Math.floor(a.length / 2);

    while (gap > 0) {
        for (let i = gap; i < a.length; i++) {
            let temp = a[i];
            let j = i;

            while (j >= gap && cmp(a[j - gap], temp, asc)) {
                comp++;
                a[j] = a[j - gap];
                j -= gap;
            }

            a[j] = temp;
        }

        gap = Math.floor(gap / 2);
    }

    console.log("shell:", comp);
    return a;
}

// 5. швидке
function quickSort(arr, asc = true) {
    let a = clearArr(arr.slice());
    let comp = 0;

    function qs(a) {
        if (a.length <= 1) return a;

        let pivot = a[0];
        let left = [];
        let right = [];

        for (let i = 1; i < a.length; i++) {
            comp++;
            if (cmp(pivot, a[i], asc)) {
                left.push(a[i]);
            } else {
                right.push(a[i]);
            }
        }

        return [...qs(left), pivot, ...qs(right)];
    }

    let res = qs(a);
    console.log("quick:", comp);
    return res;
}


// ===== демонстрація =====

// звичайний масив
let arr = [];
for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100));
}

console.log("звичайний масив");

bubbleSort(arr, true);
selectionSort(arr, true);
insertionSort(arr, true);
shellSort(arr, true);
quickSort(arr, true);


// розріджений масив
let sparse = [];
for (let i = 0; i < 100; i++) {
    if (i % 10 === 0) {
        sparse[i] = undefined;
    } else {
        sparse[i] = Math.floor(Math.random() * 100);
    }
}

console.log("розріджений масив");

bubbleSort(sparse, false);
selectionSort(sparse, false);
insertionSort(sparse, false);
shellSort(sparse, false);
quickSort(sparse, false);