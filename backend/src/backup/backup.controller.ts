import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post()
  async generate() {
    return this.backupService.generateBackup();
  }

  @Get()
  async list() {
    return this.backupService.listBackups();
  }

  @Put(':name')
  async restore(@Param('name') name: string) {
    return this.backupService.restoreBackup(name);
  }

  @Delete(':name')
  delete(@Param('name') name: string) {
    return this.backupService.delete(name);
  }
}
