import { TestingModule, Test } from "@nestjs/testing";
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from "@nestjs/config";
import { of } from "rxjs";
import { AxiosResponse } from "axios";
import { DrawModel } from '../common/models/draw.model';
import { BaseRepository } from './baseRepository';

describe('Repository Unit Testing', () => {
  let repository: BaseRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [
        BaseRepository
      ],
    }).compile();
    repository = module.get<BaseRepository>(BaseRepository);
    httpService = module.get<HttpService>(HttpService);
  })

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('Should return a draw that exist', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(requestResultSucceed));
    const response = await repository.getByDate("2022-02-14");

    expect(response.draw_date).toBe("2022-02-14");
  });

  it("Should return NotFoundException for draw that doesn't exist", async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(requestResultFailed));
    const response = await repository.getByDate("2023-02-14");

    expect(response).toBe(undefined);
  });

  it('Should return a draws list', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(requestListResultSucceed));
    const response = await repository.getAll();

    expect(response.length).toBeGreaterThan(0);
  });

});

const requestListResultSucceed: AxiosResponse = {
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  data: [{ "draw_date":"2022-02-14T00:00:00.000","winning_numbers":"16 25 27 49 55 17","multiplier":"3" }]
}

const requestResultSucceed: AxiosResponse = {
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  data: [{ "draw_date":"2022-02-14T00:00:00.000","winning_numbers":"16 25 27 49 55 17","multiplier":"3" }]
}

const requestResultFailed: AxiosResponse = {
  status: 500,
  statusText: 'FAILED',
  headers: {},
  config: {},
  data: []
}