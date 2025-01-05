export enum HolidayType {
  PUBLIC = "public",
  CUSTOMARY = "customary",
  RELIGIOUS = "religious",
}

export interface Holiday {
  date: Date;
  nameEn: string;
  nameEl: string;
  type: HolidayType;
  isMovable: boolean;
}

export interface HolidayResponse {
  isHoliday: boolean;
  holiday?: Holiday;
}
