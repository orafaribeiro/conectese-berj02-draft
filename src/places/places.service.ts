import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaceStatus } from './place-status.enum';
import { v4 as uuid } from "uuid";
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlacesRepository } from './places.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './place.entity';

@Injectable()
export class PlacesService {

    constructor(
        @InjectRepository(PlacesRepository)
        private placesRepository: PlacesRepository
    ) {}    

    async getAllPlaces(): Promise<Place[]> {
        
        return await this.placesRepository.getPlaces();

    }

    async getPlaceById(id: string): Promise<Place> {

        const found = await this.placesRepository.findOne(id);

        if (!found) {
            throw new NotFoundException('ID não encontrado');
        }

        return found;

    }

    async createPlace(
        createPlaceDto: CreatePlaceDto
    ): Promise<Place> {

        return this.placesRepository.createPlace(createPlaceDto);

    }

    async updatePlaceStatus(id: string, status: PlaceStatus): Promise<Place> {

        const place = await this.getPlaceById(id);

        place.status = status;

        return place;

    }

    async updatePlace(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {

        const place = await this.getPlaceById(id);

        const { name, site, address, image, ticket, description } = updatePlaceDto;

        if (name) {
            place.name = name;
        }

        if (site) {
            place.site = site;
        }

        if (address) {
            place.address = address;
        }

        if (image) {
            place.image = image;
        }

        if (ticket) {
            place.ticket = ticket;
        }

        if (description) {
            place.description = description;
        }

        await this.placesRepository.save(place);

        return place;

    }

    async deletePlace(id: string): Promise<void> {

        const result = await this.placesRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException("ID não encontrado.");
        }

    }

    //////////////////////////////////////////////////////////////
    // Código antigo
    // private places: Place[] = [];

    
    // getAllPlaces(): Place[] {
    //     return this.places;
    // }

    // getPlaceById(id: string): Place {

    //     const found = this.places.find((place) => place.id === id);

    //     if (!found) {
    //         throw new NotFoundException('ID não encontrado');
    //     }

    //     return found;

    // }

    // createPlace(
    //     createPlaceDto: CreatePlaceDto
    // ): Place {

    //     const { name, site, address, image, ticket, description } = createPlaceDto;

    //     const place: Place = {
    //         id: uuid(),
    //         name,
    //         site,
    //         address,
    //         image,
    //         ticket,
    //         description,
    //         status: PlaceStatus.ACTIVE
    //     };

    //     this.places.push(place);

    //     return place;
    // }

    // /*
    // createPlace(
    //     name: string,
    //     site: string,
    //     address: string,
    //     image: string,
    //     ticket: string,
    //     description: string
    // ): Place {
    //     const place: Place = {
    //         id: uuid(),
    //         name,
    //         site,
    //         address,
    //         image,
    //         ticket,
    //         description,
    //         status: PlaceStatus.ACTIVE
    //     };

    //     this.places.push(place);

    //     return place;
    // }
    // */

    // deletePlace(id: string): void {

    //     const found = this.getPlaceById(id);

    //     this.places = this.places.filter(place => place.id !== found.id);

    // }

    // updatePlace(id: string, updatePlaceDto: UpdatePlaceDto): Place {

    //     const place = this.getPlaceById(id);

    //     const { name, site, address, image, ticket, description } = updatePlaceDto;

    //     if (name) {
    //         place.name = name;
    //     }

    //     if (site) {
    //         place.site = site;
    //     }

    //     if (address) {
    //         place.address = address;
    //     }

    //     if (image) {
    //         place.image = image;
    //     }

    //     if (ticket) {
    //         place.ticket = ticket;
    //     }

    //     if (description) {
    //         place.description = description;
    //     }

    //     return place;

    // }

    // updatePlaceStatus(id: string, status: PlaceStatus): Place {

    //     const place = this.getPlaceById(id);

    //     place.status = status;

    //     return place;

    // }

}
