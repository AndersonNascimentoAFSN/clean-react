// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from './http-reponse'

export type HttpPostParams = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>
}
