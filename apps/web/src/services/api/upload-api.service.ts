import { RestApi } from './rest-api.service';
import { v4 } from 'uuid';
import { IS3SignedUrlResponse } from '../../types/content-store.type';

class Upload extends RestApi {
  protected override getInstanceConfig() {
    return {
      baseURL: `${this.baseUrl}content-store`,
    };
  }

  async getSignedUploadUrl(
    fileName: string,
    fileType: string,
    folderPath: string
  ): Promise<IS3SignedUrlResponse> {
    const signedUrlData = await this.getOne(
      `upload-url?fileName=${fileName}&fileType=${fileType}&folderPath=${folderPath}`
    );
    return signedUrlData;
  }

  async getSignedDownloadUrl(
    s3FileName: string,
    originalFileName: string,
    folderPath: string
  ): Promise<IS3SignedUrlResponse> {
    const signedUrlData = await this.getOne(
      `content-store/download-url?fileName=${s3FileName}&originalFileName=${originalFileName}&folderPath=${folderPath}`
    );
    return signedUrlData;
  }

  async uploadFile(file: File, folderPath = '') {
    const type = encodeURIComponent(file?.type);
    const uuid = v4();
    const fileExtension = file.name.split('.').pop();
    const fileName = uuid + '.' + fileExtension;
    const response = await this.getSignedUploadUrl(fileName, type, folderPath);
    await this.putFile(response.url, file, undefined, {
      'Content-Type': type,
    }).catch((e) => {
      throw new Error(e);
    });
    return {
      originalFileName: file.name,
      s3FileName: fileName,
    };
  }
}

export default new Upload();
