"use strict";

// Дозволені типи вхідних даних
const TYPES = new Set([
    "leg",              // катет
    "hypotenuse",       // гіпотенуза
    "adjacent angle",   // прилеглий до катета кут
    "opposite angle",   // протилежний до катета кут
    "angle"             // один з гострих кутів (коли задана гіпотенуза)
]);

// Допоміжні функції для переведення градусів ↔ радіан
const toRad = d => d * Math.PI / 180;
const toDeg = r => r * 180 / Math.PI;

// Інструкція для користувача (виводиться при запуску сторінки)
function usage() {
    console.log("Функція: triangle(значення1, тип1, значення2, тип2)");
    console.log('Типи: "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"');
    console.log("Кути задаються в градусах.");
    console.log('Приклад: triangle(7, "leg", 18, "hypotenuse");');
}
usage();

/**
 * Основна функція розв'язування прямокутного трикутника
 * Повертає "success" при успішному обчисленні або "failed"/повідомлення про помилку
 */
function triangle(v1, t1, v2, t2) {

    // ---- Перевірка числових значень ----
    if (!Number.isFinite(v1) || !Number.isFinite(v2)) {
        console.log("Помилка: введено нечислове значення");
        return "Non-numeric input";
    }

    if (v1 <= 0 || v2 <= 0) {
        console.log("Помилка: значення повинні бути додатними");
        return "Zero or negative input";
    }

    // ---- Нормалізація типів (нижній регістр, обрізання пробілів) ----
    t1 = String(t1).trim().toLowerCase();
    t2 = String(t2).trim().toLowerCase();

    if (!TYPES.has(t1) || !TYPES.has(t2)) {
        console.log("Помилка: невідомий тип аргументу");
        return "failed";
    }

    // Об'єднуємо аргументи в масив і сортуємо за типом
    // Це дозволяє не залежати від порядку введення
    const p = [{v: v1, t: t1}, {v: v2, t: t2}]
        .sort((a, b) => a.t.localeCompare(b.t));

    const a1 = p[0]; // перший аргумент
    const a2 = p[1]; // другий аргумент

    // Функція для виводу результатів у класичних позначеннях
    const out = (a, b, c, alpha, beta) => {
        console.log("a (катет) =", a);
        console.log("b (катет) =", b);
        console.log("c (гіпотенуза) =", c);
        console.log("alpha (гострий кут) =", alpha);
        console.log("beta (гострий кут) =", beta);
    };

    // Перевірка, що кут є гострим
    const isAcute = x => x > 0 && x < 90;

    // ---- Випадок 1: гіпотенуза + кут ----
    if (a1.t === "angle" && a2.t === "hypotenuse") {
        const alpha = a1.v;
        const c = a2.v;

        if (!isAcute(alpha)) {
            console.log("Помилка: кут повинен бути в межах (0°, 90°)");
            return "Invalid input";
        }

        const r = toRad(alpha);
        const a = c * Math.sin(r);
        const b = c * Math.cos(r);

        out(a, b, c, alpha, 90 - alpha);
        return "success";
    }

    // ---- Випадок 2: катет + прилеглий кут ----
    if (a1.t === "adjacent angle" && a2.t === "leg") {
        const beta = a1.v;
        const a = a2.v;

        if (!isAcute(beta)) {
            console.log("Помилка: кут повинен бути гострим");
            return "Invalid input";
        }

        const r = toRad(beta);
        const b = a * Math.tan(r);
        const c = a / Math.cos(r);

        out(a, b, c, 90 - beta, beta);
        return "success";
    }

    // ---- Випадок 3: два катети ----
    if (a1.t === "leg" && a2.t === "leg") {
        const a = a1.v;
        const b = a2.v;

        const c = Math.hypot(a, b);
        const alpha = toDeg(Math.atan2(a, b));

        out(a, b, c, alpha, 90 - alpha);
        return "success";
    }

    // ---- Випадок 4: катет + гіпотенуза ----
    if (a1.t === "hypotenuse" && a2.t === "leg") {
        const c = a1.v;
        const a = a2.v;

        if (a >= c) {
            console.log("Помилка: катет не може бути більший або рівний гіпотенузі");
            return "Invalid input";
        }

        const b = Math.sqrt(c * c - a * a);
        const alpha = toDeg(Math.asin(a / c));

        out(a, b, c, alpha, 90 - alpha);
        return "success";
    }

    // ---- Випадок 5: катет + протилежний кут ----
    if (a1.t === "leg" && a2.t === "opposite angle") {
        const a = a1.v;
        const alpha = a2.v;

        if (!isAcute(alpha)) {
            console.log("Помилка: кут повинен бути гострим");
            return "Invalid input";
        }

        const r = toRad(alpha);
        const b = a / Math.tan(r);
        const c = a / Math.sin(r);

        out(a, b, c, alpha, 90 - alpha);
        return "success";
    }

    console.log("Помилка: несумісна пара типів аргументів");
    return "failed";
}
