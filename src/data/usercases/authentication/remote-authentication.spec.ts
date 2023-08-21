import { mockAccountModel, mockAuthentication } from '@/domain/test/mock-account';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { RemoteAuthentication } from "./remove-authentication"

import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-reponse';

import { faker } from '@faker-js/faker'
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models/account-model';

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient With correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call HttpPostClient With correct body', async () => {
    const authenticationBody = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut()
    await sut.auth(authenticationBody)
    
    expect(httpPostClientSpy.body).toEqual(authenticationBody)
  })

  it('should throw invalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    }

    const promise = sut.auth(mockAuthentication())
    
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }

    const promise = sut.auth(mockAuthentication())
    
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }

    const promise = sut.auth(mockAuthentication())
    
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }

    const promise = sut.auth(mockAuthentication())
    
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult 
    }

    const account = await sut.auth(mockAuthentication())
    
    expect(account).toEqual(httpResult)
  })
})