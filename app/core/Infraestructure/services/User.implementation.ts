import { User } from '../../domain/entities/User'
import { UserInterface } from '../contracts/User.interface'

const METHOD = {
  GET: 'get'
}

const endpoint = 'https://my-json-server.typicode.com/Rowleen/dapp/users'

export default class TripImplementation implements UserInterface {
  constructor() {}

  public get = async (): Promise<User[]> => {
    const response = await fetch(endpoint, {
      method: METHOD.GET
    })

    return await response.json()
  }
}
