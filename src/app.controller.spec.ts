import request from "supertest";
import { HttpModule } from '@nestjs/axios';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AppController } from './app.controller';
import { DrawModel } from './common/models/draw.model';
import { BaseRepository } from './repositories/baseRepository';
import { PowerballService } from './services/powerballService';

describe('AppController', () => {
  let app: INestApplication;
  let appController: AppController;
  let service: PowerballService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      controllers: [AppController],
      providers: [
        BaseRepository,
        PowerballService,
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

});

const serviceresponse: DrawModel  = { "draw_date":"2022-02-14T00:00:00.000","winning_numbers":"16 25 27 49 55 17","multiplier":"3" }

const badTicketDate = {
  picks: [
    {
      numbers: [16, 25, 27, 49, 55],
      powerball: 17
    }
  ]
}; 

const badTicketDateresponse = {
  "statusCode": 400,
  "message": [
    "date must be a valid ISO 8601 date string",
    "date: must be provided"
  ],
  "error": "Bad Request"
}

const badTicketNumbers = {
  date: "2022-02-14",
  picks: [
    {
      numbers: [16, 25, 27, 49, "55"],
      powerball: 17
    }
  ]
}; 

const badTicketNumbersResponse = {
  "statusCode": 400,
  "message": [
    "numbers: pick numbers must be an array of numbers"
  ],
  "error": "Bad Request"
}

const badTicketPowerball = {
  date: "2022-02-14",
  picks: [
    {
      numbers: [16, 25, 27, 49, 55],
      powerball: "17"
    }
  ]
}; 

const badTicketPowerballResponse = {
  "statusCode": 400,
  "message": [
    "powerball: pick powerball must be an integer"
  ],
  "error": "Bad Request"
}

const jackpotTicket = {
  date: "2022-02-14",
  picks: [
    {
      numbers: [16, 25, 27, 49, 55],
      powerball: 17
    }
  ]
}; 

const jackpotTicketResponse = {
  "date": "2022-02-14",
  "hasWinner": true,
  "hasJackpot": true,
  "nonJackpotWinnings": 0,
  "picks": [
    {
      "numbers": [
        16,
        25,
        27,
        49,
        55
      ],
      "powerball": 17,
      "isWinner": true,
      "isJackpot": true,
      "winnings": 0
    }
  ]
}

const winningTicket = {
  date: "2022-02-14",
  picks: [
    {
      numbers: [16, 25, 27, 49, 55],
      powerball: 1
    }
  ]
};

const winningTicketResponse = {
  "date": "2022-02-14",
  "hasWinner": true,
  "hasJackpot": false,
  "nonJackpotWinnings": 1000000,
  "picks": [
    {
      "numbers": [
        16,
        25,
        27,
        49,
        55
      ],
      "powerball": 1,
      "isWinner": true,
      "isJackpot": false,
      "winnings": 1000000
    }
  ]
}

const losingTicket = {
  date: "2022-02-12",
  picks: [
    {
      numbers: [16, 25, 27, 49, 55],
      powerball: 17
    }
  ]
};

const losingTicketResponse = {
  "date": "2022-02-12",
  "hasWinner": false,
  "hasJackpot": false,
  "nonJackpotWinnings": 0,
  "picks": [
    {
      "numbers": [
        16,
        25,
        27,
        49,
        55
      ],
      "powerball": 1,
      "isWinner": false,
      "isJackpot": false,
      "winnings": 0
    }
  ]
}

const mixedTicket = {
  date: "2022-02-14",
  picks: [
    {
      numbers: [16, 25, 27, 49, 55],
      powerball: 17
    },
    {
      numbers: [8, 10, 21, 41, 62],
      powerball: 7
    }
  ]
};

const mixedTicketResponse = {
  "date": "2022-02-14",
  "hasWinner": true,
  "hasJackpot": true,
  "nonJackpotWinnings": 0,
  "picks": [
    {
      "numbers": [
        16,
        25,
        27,
        49,
        55
      ],
      "powerball": 17,
      "isWinner": true,
      "isJackpot": true,
      "winnings": 0
    },
    {
      "numbers": [
        8,
        10,
        21,
        41,
        62
      ],
      "powerball": 7,
      "isWinner": false,
      "isJackpot": false,
      "winnings": 0
    }
  ]
}