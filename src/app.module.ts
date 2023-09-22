import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './note/note.controller';
import { Note } from './note/note.entity';
import { NotesService } from './note/note.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-ck6v9088elhc73eol440-a.oregon-postgres.render.com',
      port: +3050,
      username: 'admin',
      password: 'fng5nMEXd3fU9FvVq0CrwLnCHHkFhsDo',
      database: 'notes_qvh9',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule { }
