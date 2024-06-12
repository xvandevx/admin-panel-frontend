import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Public } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PetsDto } from './dto/pets.dto';

@ApiBearerAuth()
@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() workDto: PetsDto) {
    return this.petsService.add(workDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() workDto: PetsDto) {
    return this.petsService.update(id, workDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.petsService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.petsService.delete(id);
  }
}
