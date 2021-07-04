import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ example: 'www.domain1.com', required: true })
  domain: string;

  @ApiProperty({
    example: ['image1.jpg', 'somepath/anotherpath/image2.gif'],
    required: true,
  })
  images: string[];
}
