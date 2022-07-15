export interface IAdminResponse<T> {
  token: string;
  payload: T;
}
