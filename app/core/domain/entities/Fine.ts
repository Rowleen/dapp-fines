export type FineStatus = 'pending' | 'approved' | 'rejected'

export type Fine = {
  id: number
  readonly initiatorId: number
  readonly sender: number
  readonly recipent: number
  readonly ammountTokens: number
  status: FineStatus
}
