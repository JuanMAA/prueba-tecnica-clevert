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
export class AppModule { }
