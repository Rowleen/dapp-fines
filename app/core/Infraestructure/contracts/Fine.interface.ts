import { Fine } from '../../domain/entities/Fine'
import { FineStatus } from '../../domain/entities/Fine'

export interface FineInterface {
  get(): Promise<Fine[]>
  post(fine: Fine): Promise<Fine>
  patch(fineId: number, status: FineStatus): Promise<Fine>
}
