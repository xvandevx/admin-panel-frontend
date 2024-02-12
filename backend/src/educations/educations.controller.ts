import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EducationsService } from './educations.service';
import { Public } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EducationDto } from './dto/education.dto';

@ApiBearerAuth()
@ApiTags('educations')
@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Post()
  create(@Body() workDto: EducationDto) {
    return this.educationsService.add(workDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() workDto: EducationDto) {
    return this.educationsService.update(id, workDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.educationsService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.educationsService.delete(id);
  }
}
