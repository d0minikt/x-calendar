import moment, { Moment } from "moment";
import { isBetween } from "./api/calendar";

const DISPLAY_FORMAT = "Do MMM";

export class DateUtils {
  static getWeekStart = (week: number): Moment =>
    moment()
      .set("isoWeek", week)
      .startOf("isoWeek");

  static getWeekEnd = (week: number): Moment =>
    moment()
      .set("isoWeek", week)
      .endOf("isoWeek");

  static weekFilter = (week: number) => {
    const date = moment().set("isoWeek", week);
    return isBetween(
      date.clone().startOf("isoWeek"),
      date.clone().endOf("isoWeek")
    );
  };

  static displayWeek = (week: number): string => {
    const selectedWeek = moment().set("isoWeek", week);

    const weekStartString = selectedWeek
      .startOf("isoWeek")
      .format(DISPLAY_FORMAT);
    const weekEndString = selectedWeek.endOf("isoWeek").format(DISPLAY_FORMAT);

    return `${weekStartString} - ${weekEndString}`;
  };
}
