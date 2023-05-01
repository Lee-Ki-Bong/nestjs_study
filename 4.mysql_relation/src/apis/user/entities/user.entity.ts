import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 유저
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
