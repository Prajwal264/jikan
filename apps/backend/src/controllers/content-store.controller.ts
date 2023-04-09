import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import TYPES from '../types';
import { ContentStoreService } from '../services/content-store.service';
import { IS3SignedUrlResponse } from '../types/content-store.type';
import { authMiddleware } from '../middlewares/auth.middleware';

@controller('/content-store', authMiddleware())
export class ContentStoreController {
  constructor(
    @inject(TYPES.ContentStoreService) private contentStoreService: ContentStoreService,
  ) { }

  @httpGet('/upload-url')
  public async getSignedUrlForUpload(req: Request, res: Response): Promise<void> {
    const fileName: string = req.query.fileName as string;
    const folderPath: string = req.query.folderPath as string;
    const fileType: string = req.query.fileType as string;
    let response: IS3SignedUrlResponse;
    try {
      response = await this.contentStoreService.getUploadURL(folderPath, fileName, fileType);
    } catch (err) {
      throw new Error(`Error Fetching signed upload URL: ${err}`);
    }
    res.json(response);
  }

  @httpGet('/download-url')
  public async getSignedUrlForDownload(req: Request, res: Response): Promise<void> {
    const fileName: string = req.query.fileName as string;
    const originalFileName: string = req.query.originalFileName as string;
    const folderPath: string = req.query.folderPath as string;
    let response: IS3SignedUrlResponse;
    try {
      response = await this.contentStoreService.getDownloadURL(
        folderPath,
        fileName,
        originalFileName,
      );
    } catch (err) {
      throw new Error('Error fetching download url');
    }
    res.json(response);
  }
}
