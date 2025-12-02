import { Injectable } from "@nestjs/common";
import { NecHidrica } from "./necHidrica.entity";

@Injectable()
export class NecHidricaService {
  async getAll() {
    return await NecHidrica.find();
  }
}