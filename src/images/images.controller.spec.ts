import { Test, TestingModule } from '@nestjs/testing';
import { CreateImageDto } from './dto/create-image.dto';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

describe('ImagesController', () => {
  let controller: ImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save images') => {
    const images1: CreateImageDto = { domain: 'www.domain1.com', images: ['image1.jpg', 'somepath/anotherpath/image2.gif']}
    const images2: CreateImageDto = { domain: 'www.domain2.com', images: ['image3.jpg', 'somepath/anotherpath/image4.gif']}
    controller.
    const results = controller.findAll();
    // expect()
  }
});
