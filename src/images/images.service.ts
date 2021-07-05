import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Image[]> {
    const images = [];
    try {
      createImageDto.images.forEach(async (i: string) => {
        const img: Image = {
          domain: createImageDto.domain,
          url: i,
        };
        await this.imagesRepository.create(img);
        images.push(await this.imagesRepository.save(img));
      });
      return images;
    } catch (err) {
      throw err;
    }
  }

  findAll(page: number, limit: number): Promise<Image[]> {
    const thePage = page - 1;
    return this.imagesRepository.find({ skip: thePage * limit, take: limit });
  }

  async paginate(
    options: IPaginationOptions,
    domain?: string,
  ): Promise<Pagination<Image>> {
    const queryBuilder = this.imagesRepository.createQueryBuilder('i');
    if (domain) {
      queryBuilder.where('i.domain LIKE %:domain%', { domain });
    }

    return paginate<Image>(queryBuilder, options);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} image`;
  // }

  // update(id: number, updateImageDto: UpdateImageDto) {
  //   return `This action updates a #${id} image`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} image`;
  // }
}
