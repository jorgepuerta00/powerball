import { Body, Controller, Post } from '@nestjs/common';
import { DrawDTO } from './common/dto/draw.dto';
import { TicketDTO } from './common/dto/ticket.dto';
import { UserPickDTO } from './common/dto/userpick.dto';
import { RequestTicket, ResponseTicket } from './common/models/ticket.model';
import { getTicketWithWinnings } from './common/utils/calculateWins';
import { PowerballService } from './services/powerballService';

@Controller()
export class AppController {
  constructor(
    private powerballService: PowerballService
  ) {}

  @Post()
  async getWinnings(@Body() body: RequestTicket): Promise<ResponseTicket> {
    const { picks, date } = body;

    const ticket: TicketDTO = new TicketDTO(date, picks);

    const drawData = await this.powerballService.getDraw(date);
    const draw: DrawDTO = new DrawDTO(drawData);
    
    return getTicketWithWinnings(ticket.picks, draw);
  }

}