import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceStatusDto } from './dto/update-place-status.dto';
import { Place, PlaceStatus } from './place.model';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {

    constructor(private placesService: PlacesService) {}

    // http://localhost:3000/places
    @Get()
    getAllPlaces(): Place[] {

        return this.placesService.getAllPlaces();

    }

    // http://localhost:3000/places/123654asaa
    @Get(':id')
    getPlaceById(@Param('id') id: string): Place {

        return this.placesService.getPlaceById(id);

    }

    @Post()
    createPlace(
        @Body() createPlaceDto: CreatePlaceDto,        
    ) {

        return this.placesService.createPlace(createPlaceDto);

    }

    /*
    @Post()
    createPlace(
        @Body('name') name: string,
        @Body('site') site: string,
        @Body('address') address: string,
        @Body('image') image: string,
        @Body('ticket') ticket: string,
        @Body('description') description: string,
    ) {

        return this.placesService.createPlace(
            name,
            site,
            address,
            image,
            ticket,
            description
        );

    }
    */

    @Patch(':id/status')
    updatePlaceStatus(
        @Param('id') id: string,
        @Body() newStatus: UpdatePlaceStatusDto 
    ) {

        const { status } = newStatus;

        return this.placesService.updatePlaceStatus(id, status);

    }

    @Delete(':id')
    deletePlace(@Param('id') id: string): void {

        return this.placesService.deletePlace(id);

    }

}
