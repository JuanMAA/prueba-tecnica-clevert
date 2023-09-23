import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) { }

  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  async findOne(id: number): Promise<Note | undefined> {
    return await this.noteRepository.findOne({
      where: { id },
      withDeleted: true
    });
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(createNoteDto);
    return await this.noteRepository.save(note);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note | undefined> {
    await this.noteRepository.update(id, updateNoteDto);
    return await this.noteRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.noteRepository.softDelete(id);
  }
}