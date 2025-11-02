/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ArticleEntity } from '../article/article.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];


  @Column()
  password?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashpassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
