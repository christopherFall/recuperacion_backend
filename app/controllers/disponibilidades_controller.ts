import type { HttpContext } from '@adonisjs/core/http'
import Disponibilidad from '#models/disponibilidad'

export default class DisponibilidadesController {
  async store({ request, response }: HttpContext) {
    const { especialista_id, dia_semana, hora_inicio, hora_fin } = request.only([
      'especialista_id',
      'dia_semana',
      'hora_inicio',
      'hora_fin',
    ])

    if (hora_inicio >= hora_fin) {
      return response.badRequest({
        error: 'El rango horario es inválido: hora_inicio debe ser menor que hora_fin.',
      })
    }

    const traslape = await Disponibilidad.query()
      .where('especialista_id', especialista_id)
      .where('dia_semana', dia_semana)
      .where((query) => {
        query
          .whereBetween('hora_inicio', [hora_inicio, hora_fin])
          .orWhereBetween('hora_fin', [hora_inicio, hora_fin])
          .orWhere((q) => {
            q.where('hora_inicio', '<', hora_inicio).where('hora_fin', '>', hora_fin)
          })
      })
      .first()

    if (traslape) {
      return response.badRequest({
        error: 'Existe un traslape con otro horario asignado para este día.',
      })
    }

    const disponibilidad = await Disponibilidad.create({
      especialista_id,
      dia_semana,
      hora_inicio,
      hora_fin,
    })

    return response.created(disponibilidad)
  }

  async destroy({ params, response }: HttpContext) {
    const disponibilidad = await Disponibilidad.findOrFail(params.id)
    await disponibilidad.delete()
    return response.ok({ message: 'Disponibilidad eliminada correctamente' })
  }
}
