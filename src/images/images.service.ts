import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  create(createImageDto: CreateImageDto): Promise<Image> {
    try {
      createImageDto.images.forEach((i: string) => {
        const img: Image = {
          id: Date.now(),
          domain: createImageDto.domain,
          url: i,
        };
        this.imagesRepository.create(img);
        this.imagesRepository.save(img);
      });
      const newUser = this.imagesRepository.create({
        id: Date.now(),
        ...createImageDto,
      });
      return this.imagesRepository.save(newUser);
    } catch (err) {
      throw err;
    }
  }

  findAll(page: number, limit: number): Promise<Image[]> {
    const thePage = page - 1;
    return this.imagesRepository.find({ skip: thePage * limit, take: limit });
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
