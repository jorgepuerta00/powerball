import { UserPickDTO } from "./userpick.dto";

export class TicketDTO {
  date: string;
  picks: UserPickDTO[];

  constructor(date: string, picks: any[]) {
    this.date = date;
    this.picks = picks.map(
      (p): UserPickDTO => ({
        numbers: new Set(p.numbers),
        powerball: p.powerball
      })
    );
  }

}