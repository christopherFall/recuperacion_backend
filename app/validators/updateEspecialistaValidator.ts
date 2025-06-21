// app/Validators/updateInstructorValidator.ts
import vine from '@vinejs/vine'

export const updateEspecialistaValidator = vine.compile(
  vine.object({
    nombre_completo: vine.string().trim().minLength(3).optional(),
    especialidad_id: vine
      .number()
      .exists(async (db, value) => {
        const row = await db.from('especialidades').where('id', value).first()
        return !!row
      })
      .optional(),
    registro_profesional: vine.string().trim().optional(), // La verificación de unicidad con exclusión del actual se hará en el controlador
  })
)
