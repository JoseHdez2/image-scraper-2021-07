/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateImageDto } from './dto/create-image.dto';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { testConfig } from '../../ormconfig';

describe('ImagesController', () => {
  let controller: ImagesController;
  let entity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConfig), TypeOrmModule.forFeature([Image])],
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();

    entity = module.get(getRepositoryToken(Image));
    controller = module.get<ImagesController>(ImagesController);
  });

  afterEach(async () => {
    await entity.manager.connection.close();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save images', () => {
    const images1: CreateImageDto = { domain: 'www.domain1.com', images: ['image1.jpg', 'somepath/anotherpath/image2.gif']}
    const images2: CreateImageDto = { domain: 'www.domain2.com', images: ['image3.jpg', 'somepath/anotherpath/image4.gif']}
    controller.create(images1);
    let results: Image[];
    controller.findAll(1).then(data => results = data);
    expect(results.map(i => i.url)).toEqual(images1.images);
    expect(results.map(i => i.domain)[0]).toEqual(images1.domain);
  });
});