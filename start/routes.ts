/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import InstructoresController from '#controllers/instructores_controller'
import DisponibilidadesController from '#controllers/disponibilidades_controller'
import AreasController from '#controllers/areas_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/', [InstructoresController, 'index'])
    router.get('/inactivos', [InstructoresController, 'inactivos'])
    router.get('/:id', [InstructoresController, 'show'])
    router.post('/', [InstructoresController, 'store'])
    router.patch('/:id', [InstructoresController, 'update'])
    router.delete('/:id', [InstructoresController, 'destroy'])
    router.post('/:id/restaurar', [InstructoresController, 'restore'])
  }).prefix('/instructores')

router
  .group(() => {
    router.post('/', [DisponibilidadesController, 'store'])
    router.delete('/:id', [DisponibilidadesController, 'destroy'])
    router.patch('/:id', [DisponibilidadesController, 'update'])
  }).prefix('/disponibilidades')

router.get('/areas', [AreasController, 'index'])
router.post('/areas', [AreasController, 'store'])
router.get('/areas/:id', [AreasController, 'show'])
router.put('/areas/:id', [AreasController, 'update'])
router.delete('/areas/:id', [AreasController, 'destroy'])
