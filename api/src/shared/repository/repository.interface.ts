export default interface RepositoryInterface<T> {
  create(entity: T): Promise<T | void>;
  update(id: number, data: T): Promise<T | void>;
  findOneById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
  delete(id: number): Promise<void>;
}
