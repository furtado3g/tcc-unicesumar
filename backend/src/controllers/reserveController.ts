import { Request, Response } from "express";
import ReserveModel from "../models/reserveModel";
import SessionModel from "../models/sessionModel";
import PermissionModel from "../models/permissionModel";
import verify from "../util/verify";

const verifier = new verify();
const permission = new PermissionModel();
const session = new SessionModel();
const reserveModel = new ReserveModel();

interface reserveInterface {
  user_id: number;
  location_id: number;
  date: string;
  time_start: string;
  time_end: string;
  classes: string;
  discipline: string;
  comments: string;
}

class ReserveController {
  async create(req: Request, res: Response) {
    const { path } = req.route;
    const { user_id, authorization } = req.headers;
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    const grant: any = await permission.verify(user_id, path);
    if (!grant.granted) {
      return res
        .status(404)
        .json({ error: "Você não possui permissão para acesso" });
    }
    const reserveModel = new ReserveModel();
    const {
      userId,
      locationId,
      date,
      time_start,
      time_end,
      classes,
      discipline,
      comments,
    } = req.body;
    if (
      !verifier.verifyNullIncommingFields({
        userId,
        locationId,
        date,
        time_start,
        time_end,
        classes,
        discipline,
        comments,
      })
    )
      return res.status(404).json({ message: "Campo obrigatório não informado" });
    return res.json(
      await reserveModel.insert({
        teacher_id: userId,
        location_id: locationId,
        date: date,
        time_start,
        time_end,
        class: classes,
        discipline,
        comments,
      })
    );
  }

  async update(req: Request, res: Response) {
    const { path } = req.route;
    const { user_id, authorization } = req.headers;
    const { reserveId } = req.params;
    const {
      userId,
      locationId,
      date,
      time_start,
      time_end,
      classes,
      discipline,
      comments,
    } = req.body;
    if (
      !verifier.verifyNullIncommingFields({
        reserveId,
        userId,
        locationId,
        date,
        time_start,
        time_end,
        classes,
        discipline,
        comments,
        user_id,
        authorization,
      })
    )
      return res.status(404).json({ message: "Campo obrigatório não informado" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    const grant: any = await permission.verify(user_id, path);
    if (!grant.granted) {
      return res
        .status(404)
        .json({ error: "Você não possui permissão para acesso" });
    }
    return res.json(
      await reserveModel.update(
        {
          teacher_id: userId,
          location_id: locationId,
          date: date,
          time_start,
          time_end,
          class: classes,
          discipline,
          comments,
        },
        Number(reserveId)
      )
    );
  }

  async delete(req: Request, res: Response) {
    const { path } = req.route;
    const { user_id, authorization } = req.headers;
    const { reserveId } = req.params;
    if (
      !verifier.verifyNullIncommingFields({ reserveId, user_id, authorization })
    )
      return res.status(404).json({ message: "Campo obrigatório não informado" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    const grant: any = await permission.verify(user_id, path);
    if (!grant.granted) {
      return res
        .status(404)
        .json({ error: "Você não possui permissão para acesso" });
    }
    return res.json(await reserveModel.delete(Number(reserveId)));
  }

  async list(req: Request, res: Response) {
    const { path } = req.route;
    const { user_id, authorization } = req.headers;
    if (!verifier.verifyNullIncommingFields({ user_id, authorization }))
      return res.status(404).json({ message: "Campo obrigatório não informado" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    const grant: any = await permission.verify(user_id, path);
    if (!grant.granted) {
      return res
        .status(404)
        .json({ error: "Você não possui permissão para acesso" });
    }
    const { page, perPage } = req.query;
    return res.json(await reserveModel.list(Number(page), Number(perPage)));
  }

  async detail(req: Request, res: Response) {
    const { path } = req.route;
    const { user_id, authorization } = req.headers;
    const { reserveId } = req.params;
    if (
      !verifier.verifyNullIncommingFields({ reserveId, user_id, authorization })
    )
      return res.status(404).json({ message: "Campo obrigatório não informado" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    const grant: any = await permission.verify(user_id, path);
    if (!grant.granted) {
      return res
        .status(404)
        .json({ error: "Você não possui permissão para acesso" });
    }
    return res.json(await reserveModel.detail(reserveId));
  }
}

export default ReserveController;
