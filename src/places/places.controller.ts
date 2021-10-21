import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceStatusDto } from './dto/update-place-status.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceStatus } from './place-status.enum';
import { Place } from './place.entity';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {

    constructor(private placesService: PlacesService) {}

    // http://localhost:3000/places
    @Get()
    async getAllPlaces(): Promise<Place[]> {

        return await this.placesService.getAllPlaces();

    }

    // // http://localhost:3000/places/123654asaa
    @Get(':id')
    async getPlaceById(@Param('id') id: string): Promise<Place> {

        return await this.placesService.getPlaceById(id);

    }

    @Post()
    async createPlace(
        @Body() createPlaceDto: CreatePlaceDto,        
    ): Promise<Place> {

        return await this.placesService.createPlace(createPlaceDto);

    }

    // /*
    // @Post()
    // createPlace(
    //     @Body('name') name: string,
    //     @Body('site') site: string,
    //     @Body('address') address: string,
    //     @Body('image') image: string,
    //     @Body('ticket') ticket: string,
    //     @Body('description') description: string,
    // ) {

    //     return this.placesService.createPlace(
    //         name,
    //         site,
    //         address,
    //         image,
    //         ticket,
    //         description
    //     );

    // }
    // */

    @Patch(':id/status')
    async updatePlaceStatus(
        @Param('id') id: string,
        @Body() newStatus: UpdatePlaceStatusDto 
    ): Promise<Place> {

        const { status } = newStatus;

        return this.placesService.updatePlaceStatus(id, status);

    }

    @Patch(":id")
    async updatePlace(
        @Param('id') id: string,
        @Body() updatePlaceDto: UpdatePlaceDto
    ): Promise<Place> {

        return await this.placesService.updatePlace(id, updatePlaceDto);

    }

    @Delete(':id')
    async deletePlace(@Param('id') id: string): Promise<void> {

        return await this.placesService.deletePlace(id);

    }

}
