import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Especialista from '#models/especialista'

export default class Especialidad extends BaseModel {
  public static table = 'especialidades'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @hasMany(() => Especialista)
  declare especialistas: HasMany<typeof Especialista>
}
