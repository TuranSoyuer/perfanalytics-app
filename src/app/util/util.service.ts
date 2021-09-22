export class UtilService {

  constructor() {
  }


  /** HH:MM format */
  static getHoursMinutes(dateStr: string): string {
    const date = new Date(dateStr);
    return ("0" + date.getHours().toString()).slice(-2) + ":" +
      ("0" + date.getMinutes().toString()).slice(-2);
  }

  /** Find distinct in array by key */
  static distinct(arr: any, key: any) {
    return arr.reduce(function (map: any[], currentValue: any) {
      if (!map.includes(currentValue[key])) {
        map.push(currentValue[key])
      }
      return map;
    }, []);
  };
}
