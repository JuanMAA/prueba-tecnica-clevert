import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './note/note.controller';
import { Note } from './note/note.entity';
import { NotesService } from './note/note.service';
import * as cors from 'cors';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: eval(process.env.DATABASE_SYNCHRONIZE),
    })
  ],
  controllers: [NotesController],
  providers: [NotesService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const whitelist = ['https://localhost.30000', process.env.ORIGIN_CORS];
    const corsOptions = {
      origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Acceso no permitido por CORS'));
        }
      },
    };
    consumer.apply(cors(corsOptions)).forRoutes('*');
  }
}