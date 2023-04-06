import { ContentTypes } from '../../types/content-types.type';
import { RestApi } from './rest-api.service';
import { v4 } from 'uuid';
import { IS3SignedUrlResponse } from '../../types/content-store.type';


class Upload extends RestApi {
  protected override getInstanceConfig() {
    return {
      baseURL: `${this.baseUrl}content-store`,
    };
  }

  async getSignedUploadUrl(contentType: ContentTypes, fileName: string, fileType: string): Promise<IS3SignedUrlResponse> {
    const signedUrlData = await this.getOne(`upload-url?fileName=${fileName}&contentType=${contentType}&fileType=${fileType}`);
    return signedUrlData;
  }

  async getSignedDownloadUrl(s3FileName: string, originalFileName: string): Promise<IS3SignedUrlResponse> {
    const signedUrlData = await this.getOne(`content-store/download-url?fileName=${s3FileName}&originalFileName=${originalFileName}`);
    return signedUrlData;
  }

  async uploadFile(contentType: ContentTypes, file: File) {
    const type = encodeURIComponent(file?.type);
    const uuid = v4();
    const fileExtension = file.name.split('.').pop();
    const fileName = uuid + '.' + fileExtension;
    const response = await this.getSignedUploadUrl(contentType, fileName, type);
    await this.putFile(response.url, file, undefined, {
      'Content-Type': type,
      // "Access-Control-Allow-Origin": "*",
    }).catch((e) => {
      throw new Error(e);
    });
    return {
      originalFileName: file.name,
      s3FileName: fileName,
    }
  }
}

export default Upload;
