import { HttpPostClientSpy } from './../../test/mock-http-client';
import { RemoteAuthentication } from "./remove-authentication"

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient With correct URL', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})