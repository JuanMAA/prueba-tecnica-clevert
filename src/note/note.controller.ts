import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Get()
  async findAll() {
    return await this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.notesService.findOne(id);
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.create(createNoteDto);
  }

  @Post('changeStatus/:id')
  async changeStatus(@Param('id') id: number) {
    return await this.notesService.changeStatus(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.notesService.remove(id);
  }
}