import { IsDateString, ArrayNotEmpty, IsNotEmpty, Min } from 'class-validator';
import { AtLeastOnePick, NumbersAreInRange, NumbersAreIntegers, NumbersAreNotDuplicated, NumbersAreNotEmpty, NumbersLength, PowerballInRange, PowerballIsNotEmpty, PowerballIsNumber } from '../utils/customValidations';
import { RequestPick, ResponsePick } from "./pick.model";

export class RequestTicket {
  @IsNotEmpty({  message: 'date: must be provided' })
  @IsDateString({ message: 'date: is not in valid format' })
  date?: string;

  @IsNotEmpty({  message: 'picks: array of ticket pick numbers must be provided' })
  @ArrayNotEmpty({  message: 'picks: array of ticket pick numbers must be provided' })
  @AtLeastOnePick({ message: 'picks: ticket must have at least one pick' })
  @NumbersAreNotEmpty({  message: 'numbers: pick numbers must be provided' })
  @NumbersAreIntegers({  message: 'numbers: pick numbers must be an array of numbers' })
  @NumbersLength( { message: 'numbers: pick must have exactly 5 numbers' })
  @NumbersAreNotDuplicated({ message: 'numbers: pick numbers must not have duplicates' })
  @NumbersAreInRange({ message: 'numbers: pick numbers must be in range [1, 69]'})
  @PowerballIsNotEmpty({  message: 'powerball: pick must have a powerball' })
  @PowerballIsNumber({  message: 'powerball: pick powerball must be an integer' })
  @PowerballInRange( { message: 'powerball: pick powerball must be in range [1, 26]' })
  picks?: Array<RequestPick>;
}

export class ResponseTicket {
  date: string;
  hasWinner: boolean;
  hasJackpot: boolean;
  nonJackpotWinnings: number;
  picks: ResponsePick[];
}