export type FineStatus = 'pending' | 'approved' | 'rejected'

export type Fine = {
  readonly initiatorId: number
  readonly sender: number
  readonly recipen: number
  readonly tokensAmmount: number
  status: FineStatus
}
