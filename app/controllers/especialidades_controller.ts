import type { HttpContext } from '@adonisjs/core/http'
import Especialidad from '#models/especialidad'

export default class EspecialidadesController {
  async index({ response }: HttpContext) {
    const especialidades = await Especialidad.all()
    return response.ok(especialidades)
  }
}
