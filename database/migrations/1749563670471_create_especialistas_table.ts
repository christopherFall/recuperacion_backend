// database/migrations/xxxxxx_especialistas.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'especialistas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre_completo').notNullable()
      table
        .integer('especialidad_id')
        .unsigned()
        .references('id')
        .inTable('especialidades')
        .onDelete('CASCADE')
      table.string('registro_profesional').notNullable().unique()
      table.boolean('activo').defaultTo(true)
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
