import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { HttpException, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { format, parse } from "date-fns";
import { DrawModel } from "../common/models/draw.model";
import { IRepository } from "./IRepository";

@Injectable()
export class BaseRepository implements IRepository<DrawModel> {

  private url = this.configService.get<string>('URL');
  private date_format = this.configService.get<string>('DATE_FORMAT');
  private date_format_utc_time = this.configService.get<string>('DATE_FORMAT_UTC_TIME');

  constructor(
    private configService: ConfigService,
    private httpClient: HttpService
  ) {}

  async getByDate(date: string): Promise<DrawModel> {
    const data = await this.request();
    const draw = data.find(draw => draw.draw_date == date);
    return draw;
  }
  
  async getAll(): Promise<DrawModel[]> {
    const draws = await this.request();
    return draws;
  }

  async request(): Promise<DrawModel[]> {
    const data = await lastValueFrom(
      this.httpClient.get(
        this.url
      ).pipe(
        map((axiosResponse: AxiosResponse<DrawModel[]>) => axiosResponse.data),
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status)
        })
      )
    );
    const newData = data.map(draw => {
      return {
        draw_date: format(parse(draw.draw_date, this.date_format_utc_time, new Date()), this.date_format),
        winning_numbers: draw.winning_numbers,
        multiplier: draw.winning_numbers
      }
    });
    return newData;
  }
}