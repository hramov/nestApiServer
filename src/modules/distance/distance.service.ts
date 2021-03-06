import { Injectable } from "@nestjs/common";
import { Position } from "src/database/entities/position.entity";
import { Station } from "src/database/entities/station.entity";
import { DeleteResult, getManager, UpdateResult } from "typeorm";

@Injectable()
export class DistanceService {
    private readonly manager = getManager();

    async getStations(): Promise<Station[]> {
        return await this.manager.find(Station, { relations: ["worker", "department"], order: { position: 'ASC' } });
    }

    async getWorkerPosition(id: number): Promise<Position> {
        return await this.manager.findOne(Position, { where: { id: id } });
    }

    async getSingleStation(id: number): Promise<Station> {
        return await this.manager.findOne(Station, { where: { id: id } });
    }

    async addStation(stationData: Station): Promise<Station> {
        return await this.manager.save(Object.assign(new Station(), stationData));
    }

    async editStation(id: number, stationData: Station): Promise<UpdateResult> {
        return await this.manager.update(Station, id, {
            title: stationData.title,
            departmentId: stationData.departmentId,
            position: stationData.position,
            workerId: stationData.workerId,
            ots: stationData.ots,
            obts: stationData.obts
        });
    }

    async deleteStation(id: number): Promise<DeleteResult> {
        return await this.manager.delete(Station, id);
    }
}