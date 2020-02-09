import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';

const storageOptions = diskStorage({
  destinaton: './uploads',
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.${extname(file.originalname)}`);
  },
});

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 20, { storage: storageOptions }))
  async uploadFile(@UploadedFiles() files): Promise<any> {
    return this.uploadService.upload(files);
  }
}
