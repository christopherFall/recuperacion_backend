/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import EspecialistasController from '#controllers/especialistas_controller'
import DisponibilidadesController from '#controllers/disponibilidades_controller'
import EspecialidadesController from '#controllers/especialidades_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/', [EspecialistasController, 'index'])
    router.get('/inactivos', [EspecialistasController, 'inactivos'])
    router.get('/:id', [EspecialistasController, 'show'])
    router.post('/', [EspecialistasController, 'store'])
    router.patch('/:id', [EspecialistasController, 'update'])
    router.delete('/:id', [EspecialistasController, 'destroy'])
    router.post('/:id/restaurar', [EspecialistasController, 'restore'])
  }).prefix('/instructores')

router
  .group(() => {
    router.post('/', [DisponibilidadesController, 'store'])
    router.delete('/:id', [DisponibilidadesController, 'destroy'])
  }).prefix('/disponibilidades')

router.get('/areas', [EspecialidadesController, 'index'])
