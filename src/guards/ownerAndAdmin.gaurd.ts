import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserType } from '@user/entities/user.entity';
import { CustomHttpException } from '@helpers/custom-http-filter';
import { FORBIDDEN_ACTION, RESOURCE_NOT_FOUND } from '@constant/SystemMessages';
import { Property } from '@property/entities/property.entity';

@Injectable()
export class OwnerAndSuperAdminGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Property) private readonly propertyRepository: Repository<Property>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;
    const id = request.params.id;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new CustomHttpException(FORBIDDEN_ACTION, HttpStatus.FORBIDDEN);

    if (user.role == UserType.SUPER_ADMIN || user.role == UserType.ADMIN) {
      return true;
    }

    // Check if the user is the owner of the property
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!property) {
      throw new CustomHttpException(RESOURCE_NOT_FOUND('Property'), 404);
    }
    console.log(property.owner);
    console.log(property);

    if (!property || property.owner.id !== userId) {
      throw new CustomHttpException(FORBIDDEN_ACTION, HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
