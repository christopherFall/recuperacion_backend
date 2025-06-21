import type { HttpContext } from '@adonisjs/core/http'
import Especialidad from '#models/especialidad'
import vine from '@vinejs/vine'

const areaValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3),
  })
)

export default class EspecialidadesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search', '')

    const query = Especialidad.query()

    if (search) {
      query.whereILike('nombre', `%${search}%`)
    }

    const paginator = await query.orderBy('id', 'desc').paginate(page, limit)

    return response.ok({
      data: paginator.all(),
      meta: paginator.getMeta(),
    })
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(areaValidator)
    const nueva = await Especialidad.create(data)
    return response.created(nueva)
  }

  async show({ params, response }: HttpContext) {
    const especialidad = await Especialidad.findOrFail(params.id)
    return response.ok(especialidad)
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(areaValidator)
    const especialidad = await Especialidad.findOrFail(params.id)
    especialidad.merge(data)
    await especialidad.save()
    return response.ok(especialidad)
  }

  async destroy({ params, response }: HttpContext) {
    const especialidad = await Especialidad.findOrFail(params.id)
    await especialidad.delete()
    return response.ok({ message: 'Área eliminada correctamente' })
  }
}
