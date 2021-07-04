import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiOkResponse({ type: Image })
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit?: number,
  ) {
    return this.imagesService.findAll(page, limit);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.imagesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
  //   return this.imagesService.update(+id, updateImageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.imagesService.remove(+id);
  // }
}
