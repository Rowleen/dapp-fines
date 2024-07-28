import { User } from '../../domain/entities/User'

export interface UserInterface {
  get(): Promise<User[]>
}
