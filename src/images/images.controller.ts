/* eslint-disable prettier/prettier */
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
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiOkResponse()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'domain', required: false })
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit?: number,
    @Query('domain') domain?: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.imagesService.paginate({ page, limit }, domain);
  }

  @Post('createTestData')
  @ApiOkResponse()
  async createTestData() {
    const testDomains = ['www.domain1.com', 'www.domain2.com', 'www.example.io', 'www.test.it']
    for (const domain of testDomains) {
      const testData: CreateImageDto = {domain, images: [...Array(100).keys()].map(i => `image${i}.jpg`)};
      await this.imagesService.create(testData);
    }
    return ApiOkResponse();
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
