import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Sequelize } from 'sequelize';
import { InjectConnection } from '@nestjs/sequelize';

const tableList = [
  'contents',
  'skills',
  'works',
  'educations',
  'pages',
  'work_skills',
  'page_contents',
  'blog_tags',
  'blog_posts',
  'blog_comments',
  'blog_post_tags',
];

@Injectable()
export class BackupService {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}
  async generateBackup() {
    const backupFileName = `backup_${new Date()
      .toISOString()
      .replace(/[:T]/g, '_')
      .slice(0, -5)}`;

    const tableNames = await this.sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
    );

    const result = {};

    for (const table of tableNames) {
      const tableData = await this.sequelize.query(
        `SELECT * FROM "${table[0]}"`,
      );
      result[table[0]] = tableData[0];
    }

    const jsonData = JSON.stringify(result);
    const fileName = `${process.env.BACKUP_FOLDER}/${backupFileName}.json`;
    fs.writeFileSync(fileName, jsonData);
  }

  async listBackups() {
    const backupFiles = fs.readdirSync(process.env.BACKUP_FOLDER);
    return backupFiles;
  }

  async restoreBackup(backupFileName: string) {
    const fileName = `${process.env.BACKUP_FOLDER}/${backupFileName}`;
    const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));

    for (const tableName of tableList) {
      await this.sequelize.query(
        `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`,
      );

      for (const record of data[tableName]) {
        if (record) {
          const columns = Object.keys(record)
            .map((key) => `"${key}"`)
            .join(', ');
          const values = Object.values(record)
            .map((value) => `'${value}'`)
            .join(', ');

          await this.sequelize.query(
            `INSERT INTO "${tableName}" (${columns}) VALUES (${values});`,
          );
        }
      }
    }
  }

  async delete(backupFileName: string) {
    const fileName = `${process.env.BACKUP_FOLDER}/${backupFileName}`;
    await fs.unlink(fileName, (err) => {
      if (err) {
        return err;
      }

      return 'success';
    });
  }
}
