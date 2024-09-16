import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { skipAuth } from '@/helpers/skipAuth';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async createProperty(@Body() createPropertyDto: CreatePropertyDto, @Req() req) {
    const ownerId = req.user?.sub;
    return await this.propertyService.createProperty(createPropertyDto, ownerId);
  }

  @skipAuth()
  @Get()
  findAllProperties() {
    return this.propertyService.findAllProperties();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyService.updateProperty(id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}
