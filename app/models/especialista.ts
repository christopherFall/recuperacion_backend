import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Especialidad from '#models/especialidad'
import Disponibilidad from '#models/disponibilidad'

export default class Especialista extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre_completo: string

  @column()
  declare especialidad_id: number

  @column()
  declare registro_profesional: string

  @column()
  declare activo: boolean

  @belongsTo(() => Especialidad, {
    foreignKey: 'especialidad_id',
  })
  declare especialidad: BelongsTo<typeof Especialidad>

  @hasMany(() => Disponibilidad, {
    foreignKey: 'especialista_id',
  })
  declare disponibilidades: HasMany<typeof Disponibilidad>
}
