# Hellenic Holidays

A modern, comprehensive TypeScript/JavaScript package for handling Greek holidays, celebrations, and Orthodox calendar calculations.

[![npm version](https://badge.fury.io/js/hellenic-holidays.svg)](https://badge.fury.io/js/hellenic-holidays)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/yourusername/hellenic-holidays)

## Why Choose This Package?

- ✅ 100% Test Coverage with comprehensive test suite
- 🔍 Accurate Orthodox Easter calculations
- 📚 Extensive documentation and examples
- 💪 Modern TypeScript implementation with full type safety
- 🎯 Zero dependencies
- 🌍 Bilingual support (English/Greek)
- ⚡ Efficient date handling and calculations
- 🧪 Robust Jest testing suite

## Features

- 🗓️ Complete list of Greek public holidays
- ⚡ Support for both fixed and movable holidays (like Orthodox Easter)
- 🔍 Easy date querying and validation
- 🌍 Bilingual support (Greek and English)
- 📅 Holiday type categorization (public, religious, customary)
- 💪 Written in TypeScript with full type support

## Installation

```bash
npm install hellenic-holidays
# or
yarn add hellenic-holidays
```

## Quick Start

```typescript
import { HolidayService } from "hellenic-holidays";

const holidayService = new HolidayService();

// Check if a date is a holiday
const christmas = new Date(2024, 11, 25);
const result = holidayService.isHoliday(christmas);
console.log(result.isHoliday); // true
console.log(result.holiday?.nameEn); // "Christmas Day"
console.log(result.holiday?.nameEl); // "Χριστούγεννα"

// Get all holidays for a year
const holidays2024 = holidayService.getHolidays(2024);

// Get the next holiday from a specific date
const nextHoliday = holidayService.getNextHoliday(new Date());
```

## API Reference

### `HolidayService`

#### `getHolidays(year: number): Holiday[]`

Returns all holidays for the specified year.

#### `isHoliday(date: Date): HolidayResponse`

Checks if a given date is a holiday.

#### `getHolidaysBetweenDates(startDate: Date, endDate: Date): Holiday[]`

Returns all holidays between two dates.

#### `getHolidaysByType(year: number, type: HolidayType): Holiday[]`

Returns holidays of a specific type for the given year.

#### `getNextHoliday(date: Date): Holiday | undefined`

Returns the next upcoming holiday from the given date.

### Types

```typescript
enum HolidayType {
  PUBLIC = "public",
  CUSTOMARY = "customary",
  RELIGIOUS = "religious",
}

interface Holiday {
  date: Date;
  nameEn: string;
  nameEl: string;
  type: HolidayType;
  isMovable: boolean;
}

interface HolidayResponse {
  isHoliday: boolean;
  holiday?: Holiday;
}
```

## Examples

### Get All Holidays for a Year

```typescript
import { HolidayService } from "hellenic-holidays";

const holidayService = new HolidayService();
const holidays = holidayService.getHolidays(2024);

holidays.forEach((holiday) => {
  console.log(
    `${holiday.date.toDateString()}: ${holiday.nameEn} (${holiday.nameEl})`
  );
});
```

### Check for Holidays in a Date Range

```typescript
import { HolidayService } from "hellenic-holidays";

const holidayService = new HolidayService();
const startDate = new Date(2024, 0, 1); // January 1, 2024
const endDate = new Date(2024, 1, 1); // February 1, 2024

const holidays = holidayService.getHolidaysBetweenDates(startDate, endDate);
```

### Filter Holidays by Type

```typescript
import { HolidayService, HolidayType } from "hellenic-holidays";

const holidayService = new HolidayService();

// Get only public holidays
const publicHolidays = holidayService.getHolidaysByType(
  2024,
  HolidayType.PUBLIC
);

// Get only religious holidays
const religiousHolidays = holidayService.getHolidaysByType(
  2024,
  HolidayType.RELIGIOUS
);
```

## Comparison with Other Solutions

| Feature                   | Hellenic Holidays | Others  |
| ------------------------- | ----------------- | ------- |
| TypeScript Support        | ✅ Full           | Partial |
| Test Coverage             | 100%              | Varies  |
| Orthodox Easter Algorithm | ✅ Accurate       | Varies  |
| Bilingual Support         | ✅ Complete       | Limited |
| Modern Implementation     | ✅ ES2020+        | Varies  |
| Active Maintenance        | ✅ Regular        | Varies  |
| Documentation             | ✅ Comprehensive  | Basic   |
| Type Safety               | ✅ Full           | Partial |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Check out our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## Support

⭐ If you find this package useful, please consider giving it a star on GitHub!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
