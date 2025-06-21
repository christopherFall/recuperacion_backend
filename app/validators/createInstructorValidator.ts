// app/Validators/createInstructorValidator.ts
import vine from '@vinejs/vine'

export const createInstructorValidator = vine.compile(
  vine.object({
    nombre_completo: vine.string().trim().minLength(3),
    especialidad_id: vine.number().exists(async (db, value) => {
      const row = await db.from('especialidades').where('id', value).first()
      return !!row
    }),
    registro_profesional: vine
      .string()
      .trim()
      .minLength(9)
      .maxLength(10)
      .unique(async (db, value) => {
        const row = await db.from('especialistas').where('registro_profesional', value).first()
        return !row
      }),
  })
)
