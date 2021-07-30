import DesenvolvedorModel from "../models/DesenvolvedorModel";
import DesenvolvedorInterface from "../interfaces/DesenvolvedorInterface";
import { Request, Response } from "express";

export default class DesenvolvedorController {
  public async consultaTodosDesenvolvedores(
    req: Request,
    res: Response
  ): Promise<any> {
    DesenvolvedorModel.find().then((desenvolvedores) => {
      return res.status(200).json(desenvolvedores);
    });
  }

  public async consultaDesenvolvedorID(
    req: Request,
    res: Response
  ): Promise<any> {
    DesenvolvedorModel.findById(req.params._id)
      .then((desenvolvedor) => {
        return res.status(200).json(desenvolvedor);
      })
      .catch((err) => {
        res.status(404).json({
          mensagem: "Desenvolvedor não encontrado",
          error: err,
        });
      });
  }

  public async criarNovoDesenvolvedor(
    req: Request,
    res: Response
  ): Promise<any> {
    await DesenvolvedorModel.create(req.body)
      .then((desenvolvedor) => {
        res.status(201).json(desenvolvedor);
      })
      .catch((err) => {
        res.status(400).json({
          mensagem: `Error ao criar desenvolvedor ${req.body.nome}`,
          error: err,
        });
      });
  }

  public async atualizaDesenvolvedor(
    req: Request,
    res: Response
  ): Promise<any> {
    await DesenvolvedorModel.findByIdAndUpdate({ _id: req.body._id }, req.body)
      .then((desenvolvedor) => {
        res.status(200).json(desenvolvedor);
      })
      .catch((err) => {
        res.status(400).json({
          mensagem: "Error ao atualizar desenvolvedor",
          error: err,
        });
      });
  }

  public async deletarDesenvolvedor(req: Request, res: Response): Promise<any> {
    await DesenvolvedorModel.findByIdAndDelete(req.params._id)
      .then(() => {
        res.status(204).json("Desenvolvedor excluído com sucesso!");
      })
      .catch((err) => {
        res.status(400).json({
          mensagem: "Error ao excluir o desenvolvedor",
          error: err,
        });
      });
  }
}
