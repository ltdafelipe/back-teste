import express from 'express'
import DesenvolvedorController from '../controllers/desenvolvedorController'
const router = express.Router()
const desenvolvedorController = new DesenvolvedorController()

router.get('/developers', desenvolvedorController.consultaTodosDesenvolvedores)
// router.get('/developers', desenvolvedorController.consultaTodosDesenvolvedores)
router.get('/developers/:_id', desenvolvedorController.consultaDesenvolvedorID)
router.post('/developers', desenvolvedorController.criarNovoDesenvolvedor)
router.put('/developers/:_id', desenvolvedorController.atualizaDesenvolvedor)
router.delete('/developers/:_id', desenvolvedorController.deletarDesenvolvedor)

export = router