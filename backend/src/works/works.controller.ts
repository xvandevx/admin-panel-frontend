import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorksService } from './works.service';
import { Public } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WorkDto } from '../../types/work';

@ApiBearerAuth()
@ApiTags('works')
@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Post()
  create(@Body() workDto: WorkDto) {
    return this.worksService.add(workDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() workDto: WorkDto) {
    return this.worksService.update(id, workDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.worksService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.worksService.delete(id);
  }
}
