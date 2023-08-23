import {AxiosHttpClient} from './axios-http-client'
import axios from 'axios'
import { mockAxios } from '@/infra/mock'
import { mockPostRequest } from '@/data/mocks/mock-http-post'

jest.mock('axios')

type SutType = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutType => {
  const sut =  new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct values URL, verb and body', async () => {
    const request = mockPostRequest()
    const {sut, mockedAxios} = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', () => {
    const {sut, mockedAxios} = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})