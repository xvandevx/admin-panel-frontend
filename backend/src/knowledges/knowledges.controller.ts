import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { KnowledgesService } from './knowledges.service';
import { Public } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { KnowledgesDto } from './dto/knowledges.dto';

@ApiBearerAuth()
@ApiTags('knowledges')
@Controller('knowledges')
export class KnowledgesController {
  constructor(private readonly knowledgesService: KnowledgesService) {}

  @Post()
  create(@Body() knowledgesDto: KnowledgesDto) {
    return this.knowledgesService.add(knowledgesDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() knowledgesDto: KnowledgesDto) {
    return this.knowledgesService.update(id, knowledgesDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.knowledgesService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.knowledgesService.delete(id);
  }
}
