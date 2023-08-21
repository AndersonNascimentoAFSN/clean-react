// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from './http-reponse'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>
}
