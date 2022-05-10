export class RequestPick {
  numbers: Array<number>;
  powerball: number;
}

export class ResponsePick {
  numbers: Array<number>;
  powerball: number;
  isWinner: boolean;
  isJackpot: boolean;
  winnings: number;
}