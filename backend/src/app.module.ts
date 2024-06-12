import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorksModule } from './works/works.module';
import { ConfigModule } from '@nestjs/config';
import { Works } from './works/works.model';
import { SkillsModule } from './skills/skills.module';
import { Skills } from './skills/skills.model';
import { Pages } from './pages/pages.model';
import { PagesModule } from './pages/pages.module';
import { Contents } from './contents/contents.model';
import { ContentsModule } from './contents/contents.module';
import { PageContents } from './contents/page-contents.model';
import { WorkSkills } from './works/work-skills.model';
import { Educations } from './educations/educations.model';
import { EducationsModule } from './educations/educations.module';
import { Users } from './users/users.model';
import { Roles } from './roles/roles.model';
import { UserRoles } from './roles/user-roles';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { BlogModule } from './blog/blog.module';
import { Comments } from './blog/comments/comments.model';
import { Posts } from './blog/posts/posts.model';
import { Tags } from './blog/tags/tags.model';
import { PostTags } from './blog/tags/post-tags';
import { BackupModule } from './backup/backup.module';
import { Knowledges } from './knowledges/knowledges.model';
import { KnowledgesSkills } from './knowledges/knowledge-skills.model';
import { KnowledgesModule } from './knowledges/knowledges.module';
import { Pets } from './pets/pets.model';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.local.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Works,
        Skills,
        WorkSkills,
        Pages,
        Contents,
        PageContents,
        Educations,
        Roles,
        Users,
        UserRoles,
        Comments,
        PostTags,
        Posts,
        Tags,
        Knowledges,
        KnowledgesSkills,
        Pets,
      ],
      autoLoadModels: true,
      logging: false,
      synchronize: true,
    }),
    WorksModule,
    SkillsModule,
    PagesModule,
    ContentsModule,
    EducationsModule,
    UsersModule,
    RolesModule,
    AuthModule,
    BlogModule,
    BackupModule,
    KnowledgesModule,
    PetsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
