import { Holiday, HolidayResponse, HolidayType } from "../types";
import { fixedHolidays, getMovableHolidays } from "../data/holidays";

export class HolidayService {
  /**
   * Get all holidays for a specific year
   * @param year The year to get holidays for
   * @returns Array of holidays
   */
  public getHolidays(year: number): Holiday[] {
    // Convert fixed holidays to actual dates for the given year
    const fixedDates = fixedHolidays.map((holiday) => ({
      ...holiday,
      date: holiday.getDate(year),
    }));

    // Get movable holidays
    const movableDates = getMovableHolidays(year);

    // Combine and sort all holidays by date
    return [...fixedDates, ...movableDates].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }

  /**
   * Check if a given date is a holiday
   * @param date The date to check
   * @returns HolidayResponse object
   */
  public isHoliday(date: Date): HolidayResponse {
    const year = date.getFullYear();
    const holidays = this.getHolidays(year);

    const holiday = holidays.find((h) => this.isSameDay(h.date, date));

    return {
      isHoliday: !!holiday,
      holiday,
    };
  }

  /**
   * Get holidays between two dates
   * @param startDate Start date
   * @param endDate End date
   * @returns Array of holidays
   */
  public getHolidaysBetweenDates(startDate: Date, endDate: Date): Holiday[] {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    let holidays: Holiday[] = [];

    // Get holidays for each year in the range
    for (let year = startYear; year <= endYear; year++) {
      holidays = [...holidays, ...this.getHolidays(year)];
    }

    // Filter holidays within the date range
    return holidays
      .filter(
        (holiday) =>
          (this.isSameDay(holiday.date, startDate) ||
            holiday.date > startDate) &&
          (this.isSameDay(holiday.date, endDate) || holiday.date < endDate)
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Get holidays by type
   * @param year The year to get holidays for
   * @param type The type of holidays to get
   * @returns Array of holidays of the specified type
   */
  public getHolidaysByType(year: number, type: HolidayType): Holiday[] {
    return this.getHolidays(year).filter((holiday) => holiday.type === type);
  }

  /**
   * Get the next holiday from a given date
   * @param date The reference date
   * @returns The next holiday or undefined if none found
   */
  public getNextHoliday(date: Date): Holiday | undefined {
    const year = date.getFullYear();
    const holidays = [
      ...this.getHolidays(year),
      ...this.getHolidays(year + 1),
    ].sort((a, b) => a.date.getTime() - b.date.getTime());

    return holidays.find(
      (holiday) =>
        holiday.date.getTime() > date.getTime() ||
        (this.isSameDay(holiday.date, date) &&
          holiday.date.getHours() >= date.getHours())
    );
  }

  /**
   * Helper function to check if two dates are the same day
   * @param date1 First date
   * @param date2 Second date
   * @returns boolean
   */
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
