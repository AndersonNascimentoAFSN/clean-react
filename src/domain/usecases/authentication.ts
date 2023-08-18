// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AccountModel } from 'domain/models/account-model'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth(user: AuthenticationParams): Promise<AccountModel>
}
