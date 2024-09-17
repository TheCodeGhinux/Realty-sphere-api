import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';
import * as SYS_MSG from '@constant/SystemMessages';
import { CustomHttpException } from '@/helpers/custom-http-filter';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepository: Repository<Property>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  async createProperty(createPropertyDto: CreatePropertyDto, ownerId: string) {
    const user = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!user) throw new CustomHttpException(SYS_MSG.USER_NOT_FOUND, 404);

    const newProperty = new Property();
    Object.assign(newProperty, createPropertyDto);
    newProperty.owner = user;
    const property = await this.propertyRepository.save(newProperty);
    if (!property) throw new CustomHttpException(SYS_MSG.BAD_REQUEST, 400);

    return {
      message: 'Property created successfully',
      data: property,
    };
  }

  async findAllProperties() {
    const property = await this.propertyRepository.find({
      relations: ['owner'],
    });
    return {
      message: 'Properties fetched successfully',
      data: property,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  async updateProperty(id: string, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Property'), 404);

    await this.propertyRepository.update({ id }, updatePropertyDto);

    const updatedProperty = await this.propertyRepository.findOne({ where: { id } });
    if (!updatedProperty) throw new CustomHttpException(SYS_MSG.BAD_REQUEST, 400);

    return {
      message: 'Property updated successfully',
      data: updatedProperty,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
