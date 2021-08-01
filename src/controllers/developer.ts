import DesenvolvedorModel from "../models/developer";
import { default as Interface } from "../interfaces/developer";
import { Request, Response } from "express";

export default class Controller {
  public async findAll(req: Request, res: Response): Promise<Interface[]> {
    const options = {
      page: parseInt(<string>req.query.page) || 0,
      limit: parseInt(<string>req.query.limit),
    };

    const search = req.query.search
      ? { name: { $regex: ".*" + req.query.search + ".*", $options: "i" } }
      : {};

    let countTotal = await DesenvolvedorModel.countDocuments(search);
    let countPages = Math.ceil(countTotal / options.limit);

    return DesenvolvedorModel.find(search)
      .sort({ name: 1 })
      .skip(options.page > 0 ? (options.page - 1) * options.limit : 0)
      .limit(options.limit)
      .then((developers: Interface[]): any => {
        res.status(200).json({
          countTotal: countTotal,
          countPages: countPages,
          developers: developers,
        });
      })
      .catch((err) => {
        res.status(404).json({
          mensagem: "Desenvolvedores não encontrado",
          error: err,
        });
      });
  }

  public async findId(req: Request, res: Response): Promise<Interface> {
    return DesenvolvedorModel.findById(req.params._id)
      .then((result: Interface): any => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        res.status(404).json({
          mensagem: "Desenvolvedor não encontrado",
          error: err,
        });
      });
  }

  public async create(req: Request, res: Response): Promise<Interface> {
    return DesenvolvedorModel.create(req.body)
      .then((result: Interface): any => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json({
          mensagem: `Error ao criar desenvolvedor ${req.body.name}`,
          error: err,
        });
      });
  }

  public async update(req: Request, res: Response): Promise<Interface> {
    return DesenvolvedorModel.findByIdAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    )
      .then((result: Interface): any => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({
          mensagem: "Error ao atualizar desenvolvedor",
          error: err,
        });
      });
  }

  public async delete(req: Request, res: Response): Promise<any> {
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
