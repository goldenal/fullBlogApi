import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(dto: CreatePostDto): Promise<Post> {
    const created = new this.postModel(dto);
    return created.save();
  }

  async findAll(term?: string): Promise<Post[]> {
    if (!term) return this.postModel.find().exec();
    const regex = new RegExp(term, 'i');
    return this.postModel.find({
      $or: [
        { title: regex },
        { content: regex },
        { category: regex },
      
      ],
    }).exec();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post | null> {
    const post = await this.postModel.findByIdAndUpdate(
      id,
      { ...dto, updatedAt: new Date() },
      { new: true, runValidators: true },
    ).exec();
    return post;
  }

  async remove(id: string): Promise<boolean> {
    const res = await this.postModel.deleteOne({ _id: id }).exec();
    return res.deletedCount > 0;
  }
} 