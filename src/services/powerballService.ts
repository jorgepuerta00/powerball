import { Injectable } from '@nestjs/common';
import { DrawModel } from '../common/models/draw.model';
import { BaseRepository } from '../repositories/baseRepository';

@Injectable()
export class PowerballService {
  
  constructor(
    private repository: BaseRepository
  ) {}

  async getDraw(date: string): Promise<DrawModel> {
    return await this.repository.getByDate(date);
  }

  async getAllDraws(): Promise<DrawModel[]> {
    return await this.repository.getAll();
  }
  
}