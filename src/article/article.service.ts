import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CreaArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleService {
    constructor() {}

    async createArticle(user: UserEntity, createArticleDto: CreaArticleDto){
        const article = new ArticleEntity();
        article.author = user;
    }
}
