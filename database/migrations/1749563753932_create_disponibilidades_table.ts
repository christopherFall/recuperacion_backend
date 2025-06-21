// database/migrations/xxxxxx_disponibilidades.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'disponibilidades'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('especialista_id')
        .unsigned()
        .references('id')
        .inTable('especialistas')
        .onDelete('CASCADE')
      table.string('dia_semana').notNullable() // Ej: "Lunes"
      table.time('hora_inicio').notNullable()
      table.time('hora_fin').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
