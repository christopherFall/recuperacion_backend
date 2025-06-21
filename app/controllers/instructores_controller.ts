import type { HttpContext } from '@adonisjs/core/http'
import Especialista from '#models/especialista'
import Disponibilidad from '#models/disponibilidad'
import { createInstructorValidator } from '#validators/createInstructorValidator'
import { updateEspecialistaValidator } from '#validators/updateEspecialistaValidator'

export default class EspecialistasController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search', '')

    const especialistas = await Especialista.query()
      .where('activo', true)
      .if(search, (query) => {
        query
          .whereILike('nombre_completo', `%${search}%`)
          .orWhereILike('registro_profesional', `%${search}%`)
      })
      .preload('especialidad')
      .preload('disponibilidades')
      .orderBy('nombre_completo', 'asc')
      .paginate(page, limit)

    return {
      data: especialistas.all(),
      meta: especialistas.getMeta(),
    }
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createInstructorValidator)
    const { disponibilidades, ...especialistaData } = request.only([
      'nombre_completo',
      'especialidad_id',
      'registro_profesional',
      'disponibilidades',
    ])

    const especialista = await Especialista.create(especialistaData)

    if (Array.isArray(disponibilidades)) {
      await especialista.related('disponibilidades').createMany(disponibilidades)
    }

    await especialista.load('especialidad')
    await especialista.load('disponibilidades')

    return response.created(especialista)
  }

  async show({ params, response }: HttpContext) {
    const especialista = await Especialista.query()
      .where('id', params.id)
      .where('activo', true)
      .preload('especialidad')
      .preload('disponibilidades')
      .firstOrFail()

    return response.ok(especialista)
  }

  async update({ params, request, response }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)
    const raw = request.all()

    const data = await request.validateUsing(updateEspecialistaValidator)

    // Validar unicidad
    if (data.registro_profesional) {
      const existe = await Especialista.query()
        .where('registro_profesional', data.registro_profesional)
        .whereNot('id', especialista.id)
        .first()
      if (existe) {
        return response.badRequest({ error: 'El número de registro debe ser único.' })
      }
    }

    // Actualizar campos principales
    especialista.merge({
      nombre_completo: data.nombre_completo,
      especialidad_id: data.especialidad_id,
      registro_profesional: data.registro_profesional,
    })

    await especialista.save()

    // 🔁 Sincronizar disponibilidades si vienen
    if (Array.isArray(raw.disponibilidades)) {
      await Disponibilidad.query().where('especialista_id', especialista.id).delete()
      await especialista.related('disponibilidades').createMany(raw.disponibilidades)
    }

    await especialista.load('especialidad')
    await especialista.load('disponibilidades')

    return response.ok(especialista)
  }

  async destroy({ params, response }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)
    especialista.activo = false
    await especialista.save()
    return response.ok({ message: 'Instructor inactivado correctamente' })
  }

  async restore({ params, response }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)
    especialista.activo = true
    await especialista.save()
    return response.ok({ message: 'Instructor reactivado correctamente' })
  }

  async inactivos({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const especialistas = await Especialista.query()
      .where('activo', false)
      .preload('especialidad')
      .orderBy('nombre_completo', 'asc')
      .paginate(page, limit)

    return {
      data: especialistas.all(),
      meta: especialistas.getMeta(),
    }
  }
}
