// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AccountModel } from 'domain/models/account-model'

type UserAuthentication = {
  email: string
  password: string
}

export interface Authentication {
  auth(user: UserAuthentication): Promise<AccountModel>
}
