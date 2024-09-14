import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ListingType, PropertyStatus, PropertyType } from '../entities/property.entity';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  zipCode: string;

  @IsString()
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsString()
  size: string;

  @IsNumber()
  bedrooms: string;

  @IsNumber()
  bathrooms: string;

  @IsString()
  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  @IsEnum(ListingType)
  listingType: ListingType;
}
