export interface IRepository<T> {
  getByDate(date: string): Promise<T>;
  getAll(): Promise<T[]>;
}