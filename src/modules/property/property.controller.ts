import { Controller, Get, Param } from "@nestjs/common";
import { DistanceService } from "../distance/distance.service";
import { Property } from './../../database/entities/property.entity';
import { PropertyService } from "./property.service";

@Controller('property')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService,
        private readonly distanceService: DistanceService) { }

    @Get()
    async getProperty(): Promise<Property[]> {
        return await this.propertyService.getProperty();
    }

    @Get('operated')
    async findPropertyToBeOperated(): Promise<Property[]> {
        const property = await this.propertyService.needToBeOperated();

        for (let i = 0; i < property.length; i++) {
            property[i].station = await this.distanceService.getSingleStation(property[i].stationId);
        }

        return property;
    }

    @Get(':id')
    async getSingleProperty(@Param('id') id: number): Promise<Property> {
        const result = await this.propertyService.getSingleProperty(id);
        return result;
    }

    @Get('station/:id')
    async getPropertyForStation(@Param('id') id: number): Promise<Property[]> {
        return await this.propertyService.getPropertyForSingleStation(id);
    }

    // @Post()
    // async saveProperty(@Body() property: Property) {
    //     return this.propertyService.saveProperty(property);
    // }

    // @Put(':id')
    // async updateProperty(@Param('id') id: number, @Body() property: any) {
    //     return this.propertyService.updateProperty(property, id);
    // }

    // @Delete(':id')
    // async deleteProperty(@Param('id') id: number): Promise<DeleteResult> {
    //     return await this.propertyService.deleteProperty(id);
    // }
}