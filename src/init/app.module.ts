import { Logger } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserEntities } from '../users/user-entity';
import { PostEntity } from '../post/post-entity';
import { CommentEntity } from '../post/comment-entity';
import { CategoryEntity } from '../post/category-entity';

export const initAppModules = [
  ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  SequelizeModule.forRoot({
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_BASE,
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    dialect: 'postgres',
    pool: { max: 400, min: 0, acquire: 80000, idle: 10000 },
    define: {
      timestamps: true,
      underscored: true,
    },
    logging: (message) => {
      Logger.debug(message);
    },

    synchronize: true,
    autoLoadModels: true,
    ///timezone: 'Europe/Kiev',
    models: [UserEntities, PostEntity, CommentEntity, CategoryEntity],
  }),
];
