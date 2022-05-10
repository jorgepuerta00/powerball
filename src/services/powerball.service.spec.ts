import { TestingModule, Test } from "@nestjs/testing";
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from "@nestjs/config";
import { of } from "rxjs";
import { AxiosResponse } from "axios";
import { BaseRepository } from "../repositories/baseRepository";
import { PowerballService } from "./powerballService";
import { DrawModel } from "../common/models/draw.model";

describe('Powerball Service Unit Testing', () => {
  let repository: BaseRepository;
  let service: PowerballService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [
        PowerballService,
        BaseRepository
      ],
    }).compile();
    repository = module.get<BaseRepository>(BaseRepository);
    service = module.get<PowerballService>(PowerballService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a draw that exist', async () => {
    jest.spyOn(repository, 'getByDate').mockImplementation(async () => requestResultSucceed);
    const response = await service.getDraw("2022-02-14");

    expect(response.draw_date).toBe("2022-02-14");
  });

  it('Should return empty for draw that doesnt exist', async () => {
    jest.spyOn(repository, 'getByDate').mockImplementation(async () => requestResultFailed);
    const response = await service.getDraw("2023-02-14");

    expect(response).toBe(undefined);
  });

  it('Should return a draws list', async () => {
    jest.spyOn(repository, 'getAll').mockImplementation(async () => requestListResultSucceed);
    const response = await service.getAllDraws();

    expect(response.length).toBeGreaterThan(0);
  });

});

const requestListResultSucceed: DrawModel[] = [{ "draw_date":"2022-02-14","winning_numbers":"16 25 27 49 55 17","multiplier":"3" }];
const requestResultSucceed: DrawModel = { "draw_date":"2022-02-14","winning_numbers":"16 25 27 49 55 17","multiplier":"3" };
const requestResultFailed: DrawModel = undefined;