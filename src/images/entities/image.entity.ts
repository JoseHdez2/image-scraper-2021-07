// eslint-disable-next-line prettier/prettier
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  domain: string;

  @Column()
  url: string;
}
