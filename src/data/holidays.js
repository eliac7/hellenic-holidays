"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedHolidays = void 0;
exports.calculateOrthodoxEaster = calculateOrthodoxEaster;
exports.getMovableHolidays = getMovableHolidays;
const types_1 = require("../types");
function createFixedDate(month, day) {
    return (year) => new Date(year, month - 1, day);
}
// Fixed date holidays
exports.fixedHolidays = [
    {
        nameEn: "New Year's Day",
        nameEl: "Πρωτοχρονιά",
        type: types_1.HolidayType.PUBLIC,
        isMovable: false,
        getDate: createFixedDate(1, 1),
    },
    {
        nameEn: "Epiphany",
        nameEl: "Θεοφάνεια",
        type: types_1.HolidayType.RELIGIOUS,
        isMovable: false,
        getDate: createFixedDate(1, 6),
    },
    {
        nameEn: "Independence Day",
        nameEl: "Εικοστή Πέμπτη Μαρτίου",
        type: types_1.HolidayType.PUBLIC,
        isMovable: false,
        getDate: createFixedDate(3, 25),
    },
    {
        nameEn: "Labor Day",
        nameEl: "Εργατική Πρωτομαγιά",
        type: types_1.HolidayType.PUBLIC,
        isMovable: false,
        getDate: createFixedDate(5, 1),
    },
    {
        nameEn: "Dormition of the Mother of God",
        nameEl: "Κοίμηση της Θεοτόκου",
        type: types_1.HolidayType.RELIGIOUS,
        isMovable: false,
        getDate: createFixedDate(8, 15),
    },
    {
        nameEn: "Oxi Day",
        nameEl: "Επέτειος του Όχι",
        type: types_1.HolidayType.PUBLIC,
        isMovable: false,
        getDate: createFixedDate(10, 28),
    },
    {
        nameEn: "Christmas Day",
        nameEl: "Χριστούγεννα",
        type: types_1.HolidayType.PUBLIC,
        isMovable: false,
        getDate: createFixedDate(12, 25),
    },
    {
        nameEn: "Synaxis of the Mother of God",
        nameEl: "Σύναξις Υπεραγίας Θεοτόκου",
        type: types_1.HolidayType.RELIGIOUS,
        isMovable: false,
        getDate: createFixedDate(12, 26),
    },
];
// Helper function to calculate Orthodox Easter
function calculateOrthodoxEaster(year) {
    // Algorithm for Orthodox Easter
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31);
    const day = ((d + e + 114) % 31) + 1;
    // Add 13 days to convert from Julian to Gregorian calendar
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 13);
    return date;
}
// Helper function to get movable holidays for a specific year
function getMovableHolidays(year) {
    const easter = calculateOrthodoxEaster(year);
    // Calculate other dates based on Easter
    const cleanMonday = new Date(easter);
    cleanMonday.setDate(easter.getDate() - 48);
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);
    const easterMonday = new Date(easter);
    easterMonday.setDate(easter.getDate() + 1);
    const holySpirit = new Date(easter);
    holySpirit.setDate(easter.getDate() + 50);
    return [
        {
            date: cleanMonday,
            nameEn: "Clean Monday",
            nameEl: "Καθαρά Δευτέρα",
            type: types_1.HolidayType.RELIGIOUS,
            isMovable: true,
        },
        {
            date: goodFriday,
            nameEn: "Good Friday",
            nameEl: "Μεγάλη Παρασκευή",
            type: types_1.HolidayType.RELIGIOUS,
            isMovable: true,
        },
        {
            date: easter,
            nameEn: "Easter Sunday",
            nameEl: "Κυριακή του Πάσχα",
            type: types_1.HolidayType.RELIGIOUS,
            isMovable: true,
        },
        {
            date: easterMonday,
            nameEn: "Easter Monday",
            nameEl: "Δευτέρα του Πάσχα",
            type: types_1.HolidayType.RELIGIOUS,
            isMovable: true,
        },
        {
            date: holySpirit,
            nameEn: "Holy Spirit Monday",
            nameEl: "Αγίου Πνεύματος",
            type: types_1.HolidayType.RELIGIOUS,
            isMovable: true,
        },
    ];
}
