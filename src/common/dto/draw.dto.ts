import { DrawModel } from "../models/draw.model";

export class DrawDTO {
  date: string;
  numbers: Set<number>;
  powerball: number;

  constructor(draw: DrawModel) {
    const winningNumbers = draw.winning_numbers.split(" ").map((str): number => +str);
    this.date = draw.draw_date;
    this.numbers = new Set(winningNumbers.slice(0, 5));
    this.powerball = winningNumbers[5];
  }
}