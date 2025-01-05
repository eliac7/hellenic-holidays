import { HolidayService } from "../src/services/holidayService";
import { HolidayType } from "../src/types";

describe("HolidayService", () => {
  let holidayService: HolidayService;

  beforeEach(() => {
    holidayService = new HolidayService();
  });

  describe("getHolidays", () => {
    it("should return all holidays for a given year", () => {
      const holidays = holidayService.getHolidays(2024);
      expect(holidays.length).toBeGreaterThan(0);
      expect(holidays.some((h) => h.isMovable)).toBeTruthy();
      expect(holidays.some((h) => !h.isMovable)).toBeTruthy();
    });

    it("should return holidays in chronological order", () => {
      const holidays = holidayService.getHolidays(2024);
      for (let i = 1; i < holidays.length; i++) {
        expect(holidays[i].date.getTime()).toBeGreaterThanOrEqual(
          holidays[i - 1].date.getTime()
        );
      }
    });
  });

  describe("isHoliday", () => {
    it("should correctly identify Christmas as a holiday", () => {
      const christmas = new Date(2024, 11, 25); // 25 December 2024
      const result = holidayService.isHoliday(christmas);
      expect(result.isHoliday).toBeTruthy();
      expect(result.holiday?.nameEn).toBe("Christmas Day");
    });

    it("should correctly identify a non-holiday", () => {
      const nonHoliday = new Date(2024, 11, 20); // 20 December 2024
      const result = holidayService.isHoliday(nonHoliday);
      expect(result.isHoliday).toBeFalsy();
      expect(result.holiday).toBeUndefined();
    });

    it("should correctly identify Orthodox Easter", () => {
      // Orthodox Easter in 2024 is May 5
      const easter = new Date(2024, 4, 5);
      const result = holidayService.isHoliday(easter);
      expect(result.isHoliday).toBeTruthy();
      expect(result.holiday?.nameEn).toBe("Easter Sunday");
    });
  });

  describe("getHolidaysBetweenDates", () => {
    it("should return holidays within the specified date range", () => {
      const startDate = new Date(2024, 11, 20); // December 20, 2024
      const endDate = new Date(2024, 11, 27); // December 27, 2024
      const holidays = holidayService.getHolidaysBetweenDates(
        startDate,
        endDate
      );

      expect(holidays.length).toBe(2); // Christmas and Synaxis
      expect(holidays[0].nameEn).toBe("Christmas Day");
      expect(holidays[1].nameEn).toBe("Synaxis of the Mother of God");
    });

    it("should handle date ranges spanning multiple years", () => {
      const startDate = new Date(2024, 11, 25); // December 25, 2024
      const endDate = new Date(2025, 0, 2); // January 2, 2025
      const holidays = holidayService.getHolidaysBetweenDates(
        startDate,
        endDate
      );

      expect(holidays.length).toBe(3); // Christmas, Synaxis, and New Year's
      expect(holidays[0].nameEn).toBe("Christmas Day");
      expect(holidays[holidays.length - 1].nameEn).toBe("New Year's Day");
    });
  });

  describe("getHolidaysByType", () => {
    it("should return only public holidays", () => {
      const publicHolidays = holidayService.getHolidaysByType(
        2024,
        HolidayType.PUBLIC
      );
      expect(
        publicHolidays.every((h) => h.type === HolidayType.PUBLIC)
      ).toBeTruthy();
    });

    it("should return only religious holidays", () => {
      const religiousHolidays = holidayService.getHolidaysByType(
        2024,
        HolidayType.RELIGIOUS
      );
      expect(
        religiousHolidays.every((h) => h.type === HolidayType.RELIGIOUS)
      ).toBeTruthy();
    });
  });

  describe("getNextHoliday", () => {
    it("should return the next upcoming holiday", () => {
      const date = new Date(2024, 11, 20); // December 20, 2024
      const nextHoliday = holidayService.getNextHoliday(date);
      expect(nextHoliday?.nameEn).toBe("Christmas Day");
      expect(nextHoliday?.date.getTime()).toBeGreaterThan(date.getTime());
    });

    it("should return next year's holiday if no more holidays in current year", () => {
      const date = new Date(2024, 11, 27); // December 27, 2024
      const nextHoliday = holidayService.getNextHoliday(date);
      expect(nextHoliday?.nameEn).toBe("New Year's Day");
      expect(nextHoliday?.date.getFullYear()).toBe(2025);
    });
  });
});
