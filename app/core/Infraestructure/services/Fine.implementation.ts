import { Fine, FineStatus } from '../../domain/entities/Fine'
import { FineInterface } from '../contracts/Fine.interface'

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH'
}

const endpoint = 'https://my-json-server.typicode.com/Rowleen/dapp/fines'

export default class FineImplementation implements FineInterface {
  constructor() {}

  public get = async (): Promise<Fine[]> => {
    const response = await fetch(endpoint, {
      method: METHOD.GET
    })

    return await response.json()
  }

  public post = async (fine: Fine): Promise<Fine> => {
    const response = await fetch(endpoint, {
      method: METHOD.POST,
      body: JSON.stringify(fine),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    return await response.json()
  }

  public patch = async (id: number, status: FineStatus): Promise<Fine> => {
    const response = await fetch(`${endpoint}/${id}`, {
      method: METHOD.PATCH,
      body: JSON.stringify({
        status
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    return await response.json()
  }
}
