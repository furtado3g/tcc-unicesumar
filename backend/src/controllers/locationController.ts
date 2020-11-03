import { Request, Response } from "express";
import LocationModel from "../models/locationModel";
import verify from "../util/verify";
import PermissionModel from "../models/permissionModel";
import SessionModel from "../models/sessionModel";
const verifier = new verify();
const session = new SessionModel();
const permission = new PermissionModel();
const model = new LocationModel();
class LocationController {
  async new(req: Request, res: Response) {
    const { tp_location, comments, capacity } = req.body;
    const { path } = req.route;
    const { userid, authorization } = req.headers;
    if (
      !verifier.verifyNullIncommingFields({ tp_location, comments, capacity })
    )
      return res
        .status(404)
        .json({ message: "Campos obrigatórios não informados" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão expirada" });
    //checks if the user has permission to access the endpoint
    //const grant:any = await permission.verify(userid,path);
    //if(!grant.granted){
    //return res.status(404).json({error:"Você não possui permissão para acesso"})
    //}
    const response = await model.insert({
      type: tp_location,
      comments,
      capacity,
    });
    return res.json(response);
  }

  async update(req: Request, res: Response) {
    const { path } = req.route;
    const { userid, authorization } = req.headers;
    const { tp_location, comments, capacity } = req.body;
    const { locationId } = req.params;
    if (
      !verifier.verifyNullIncommingFields({
        locationId,
        tp_location,
        comments,
        capacity,
      })
    )
      return res
        .status(404)
        .json({ message: "Campos obrigatórios não informados" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    //const grant:any = await permission.verify(userid,path);
    //if(!grant.granted){
    //    return res.status(404).json({error:"Você não possui permissão para acesso"})
    //}
    const response = await model.update(
      { type: tp_location, comments, capacity },
      Number(locationId)
    );
    return res.json(response);
  }

  async delete(req: Request, res: Response) {
    const { path } = req.route;
    const { userid, authorization } = req.headers;
    const { locationId } = req.params;
    if (!verifier.verifyNullIncommingFields({ locationId }))
      return res
        .status(404)
        .json({ message: "Campo obrigatório não informado" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    //const grant:any = await permission.verify(userid,path);
    //if(!grant.granted){
    //    return res.status(404).json({error:"Você não possui permissão para acesso"})
    //}
    const response = await model.delete(Number(locationId));
    return res.json(response);
  }

  async list(req: Request, res: Response) {
    const { path } = req.route;
    const { userid, authorization } = req.headers;
    const { perPage, page } = req.query;
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    //const grant:any = await permission.verify(userid,path);
    //if(!grant.granted){
    //    return res.status(404).json({error:"Você não possui permissão para acesso"})
    //}
    return res.json(await model.getList(Number(perPage), Number(page)));
  }

  async detail(req: Request, res: Response) {
    const { path } = req.route;
    const { userid, authorization } = req.headers;
    const { locationId } = req.params;
    if (
      !verifier.verifyNullIncommingFields({ locationId, userid, authorization })
    )
      return res
        .status(404)
        .json({ message: "Campo obrigatório não informado" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    //const grant:any = await permission.verify(userid,path);
    //if(!grant.granted){
    //    return res.status(404).json({error:"Você não possui permissão para acesso"})
    //}
    return res.json(await model.detail(locationId));
  }

  async search(req: Request, res: Response) {
    const { path } = req.route;
    const { userid, authorization } = req.headers;
    const { term, type } = req.query;
    if (!verifier.verifyNullIncommingFields({ userid, authorization }))
      return res
        .status(404)
        .json({ message: "Campo obrigatório não informado" });
    //Checks whether the session is valid
    const logged = await session.verify(authorization);
    if (!logged.is_valid)
      return res.status(404).json({ error: "Sessão inválida" });
    //checks if the user has permission to access the endpoint
    //const grant:any = await permission.verify(userid,path);
    //if(!grant.granted){
    //    return res.status(404).json({error:"Você não possui permissão para acesso"})
    //}
    return res.send(model.search(term, type));
  }
}
export default LocationController;
