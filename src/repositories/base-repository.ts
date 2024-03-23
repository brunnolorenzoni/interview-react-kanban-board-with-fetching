import { HttpClient } from "../infra/http/http-client";
import { IBaseRepository } from "./types";

export abstract class BaseRepository<T> extends HttpClient implements IBaseRepository<T> {
  protected resource: string = '';

  public async get(id: string): Promise<T> {
    const instance = this.createInstance();
    return await instance.get(`${this.resource}/${id}`);
  }

  public async getMany(): Promise<T[]> {
    const instance = this.createInstance();
    return await instance.get(`${this.resource}`);
  }

  public async create(item: T): Promise<T> {
    const instance = this.createInstance();
    return await instance.post(`${this.resource}`, item);
  }

  public async update(id: string, item: T): Promise<T> {
    const instance = this.createInstance();
    return await instance.put(`${this.resource}/${id}`, item);
  }

  public async delete(id: any): Promise<T> {
    const instance = this.createInstance();
    return await instance.delete(`${this.resource}/${id}`);
  }
}
