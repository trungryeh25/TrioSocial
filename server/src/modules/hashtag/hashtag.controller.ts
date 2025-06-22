import { Controller, Get, Param } from '@nestjs/common';
import { HashtagService } from './hashtag.service';

@Controller('hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get()
  findAll() {
    return this.hashtagService.findAll();
  }

  @Get(':name/posts')
  findPostsByHashtag(@Param('name') name: string) {
    return this.hashtagService.findPostsByHashtag(name);
  }
}
