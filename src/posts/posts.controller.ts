import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      const post = await this.postsService.create(createPostDto);
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Query('term') search?: string) {
    return this.postsService.findAll(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const post = await this.postsService.findOne(id);
      if (!post) throw new NotFoundException('Post not found');
      return post;
    } catch (error) {
      if (error.name === 'CastError' || error.kind === 'ObjectId') {
        throw new NotFoundException('Post not found');
      }
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postsService.update(id, updatePostDto);
      if (!post) throw new NotFoundException('Post not found');
      return post;
    } catch (error) {
      if (error.name === 'CastError' || error.kind === 'ObjectId') {
        throw new NotFoundException('Post not found');
      }
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.postsService.remove(id);
      if (!deleted) throw new NotFoundException('Post not found');
    return;
    } catch (error) {
      if (error.name === 'CastError' || error.kind === 'ObjectId') {
        throw new NotFoundException('Post not found');
      }
      throw new BadRequestException(error.message);
    }

    
  }
} 