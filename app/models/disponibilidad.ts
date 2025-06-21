import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Especialista from '#models/especialista'

export default class Disponibilidad extends BaseModel {
  public static table = 'disponibilidades'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare especialista_id: number

  @column()
  declare dia_semana: string

  @column()
  declare hora_inicio: string

  @column()
  declare hora_fin: string

  @belongsTo(() => Especialista, {
    foreignKey: 'especialista_id',
  })
  declare especialista: BelongsTo<typeof Especialista>
}
