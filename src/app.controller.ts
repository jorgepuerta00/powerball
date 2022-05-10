import { Body, Controller, Post } from '@nestjs/common';
import { DrawDTO } from './common/dto/draw.dto';
import { TicketDTO } from './common/dto/ticket.dto';
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
    
    return null;
  }

}