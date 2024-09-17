import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { skipAuth } from '@helpers/skipAuth';
import { OwnerAndSuperAdminGuard } from '@/guards/ownerAndAdmin.gaurd';

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

  @UseGuards(OwnerAndSuperAdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyService.updateProperty(id, updatePropertyDto);
  }

  @UseGuards(OwnerAndSuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.deleteProperty(id);
  }
}
