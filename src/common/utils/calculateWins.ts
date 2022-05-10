import { DrawDTO } from "../dto/draw.dto";
import { UserPickDTO } from "../dto/userpick.dto";
import { ResponsePick } from "../models/pick.model";
import { ResponseTicket } from "../models/ticket.model";
import { intersection } from "./intersection";

export const calculateWins = (
  matchCount: number,
  doesPowerballMatch: boolean
): number => {
  switch (matchCount) {
    case 1: return doesPowerballMatch ? 4 : 0;
    case 2: return doesPowerballMatch ? 7 : 0;
    case 3: return doesPowerballMatch ? 100 : 7;
    case 4: return doesPowerballMatch ? 50000 : 100;
    case 5: return doesPowerballMatch ? 0 : 1000000;
    default: return 0;
  }
};

export const getPickWithWinnings = (pick: UserPickDTO, draw: DrawDTO): ResponsePick => {
  const matching = intersection(pick.numbers, draw.numbers);
  const matchCount = matching.size;
  const doesPowerballMatch = pick.powerball === draw.powerball;
  const isJackpot = matchCount === 5 && doesPowerballMatch;
  const winnings = calculateWins(matchCount, doesPowerballMatch);
  const isWinner = winnings > 0 || isJackpot;

  return {
    numbers: [...pick.numbers],
    powerball: pick.powerball,
    isWinner,
    isJackpot,
    winnings
  };
};

export const getTicketWithWinnings = (picks: UserPickDTO[], draw: DrawDTO): ResponseTicket => {
  const newPicks: ResponsePick[] = picks.map(
    (p): ResponsePick => {
      return getPickWithWinnings(p, draw);
    }
  );
  const hasWinner = newPicks.some((p): boolean => p.isWinner);
  const hasJackpot = newPicks.some((p): boolean => p.isJackpot);
  const nonJackpotWinnings = newPicks.reduce(
    (acc, cur): number => acc + cur.winnings,
    0
  );
  return {
    date: draw.date,
    hasWinner,
    hasJackpot,
    nonJackpotWinnings,
    picks: newPicks
  };
};