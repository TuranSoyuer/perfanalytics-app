export class UtilService {

  constructor() {
  }


  /** HH:MM format */
  static getHoursMinutes(dateStr: string): string {
    const date = new Date(dateStr);
    return ("0" + date.getHours().toString()).slice(-2) + ":" +
      ("0" + date.getMinutes().toString()).slice(-2);
  }

  /** Group array by key */
  static groupBy(arr: any, key: any) {
    return arr.reduce(function (map: any, currentValue: any) {
      (map[currentValue[key]] = map[currentValue[key]] || []).push(currentValue);
      return map;
    }, {});
  };
}
