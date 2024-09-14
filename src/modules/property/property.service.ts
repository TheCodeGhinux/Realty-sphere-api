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

  findAllProperties() {
    return `This action returns all property`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
