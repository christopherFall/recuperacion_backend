import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Especialidad from '#models/especialidad'

export default class extends BaseSeeder {
  async run() {
    await Especialidad.createMany([
      { nombre: 'Desarrollo de Software' },
      { nombre: 'Derechos Fundamentales en el trabajo' },
      { nombre: 'Inglés' },
      { nombre: 'Ciencias Naturales' },
      { nombre: 'Ética y Valores' },
      { nombre: 'Cultura y religión' },
      { nombre: 'Topografía' },
    ])
  }
}
