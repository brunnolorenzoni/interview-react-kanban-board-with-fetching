export interface IBaseRepository<T> {
  get(id: any): Promise<T>;
  getMany(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: any, item: T): Promise<T>;
  delete(id: any): Promise<T>;
}
