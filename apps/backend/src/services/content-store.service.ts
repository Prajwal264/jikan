/* eslint-disable no-restricted-syntax */
/* eslint-disable turbo/no-undeclared-env-vars */
import { injectable } from 'inversify';

import AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IS3SignedUrlResponse } from '../types/content-store.type';

@injectable()
export class ContentStoreService {
  private s3: AWS.S3;

  private bucket: string;

  private expiresIn: number;

  constructor() {
    AWS.config.update({ region: process.env.AWS_REGION });
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      signatureVersion: 'v4',
    });
    this.s3 = s3;
    this.bucket = process.env.AWS_S3_BUCKET_NAME!;
    this.expiresIn = Number(process.env.SIGNED_URL_EXPIRY || '300');
  }

  public async getUploadURL(
    folder: string,
    fileName: string,
    fileType: string,
  ): Promise<IS3SignedUrlResponse> {
    const key: string = `${folder}/${fileName}`;
    const presignedUrl: string = await this.s3.getSignedUrlPromise(
      'putObject',
      {
        Bucket: this.bucket,
        Key: key,
        Expires: this.expiresIn,
        ContentType: fileType,
      },
    );
    return { url: presignedUrl, expiresIn: this.expiresIn };
  }

  public async getDownloadURL(
    folder: string,
    fileName: string,
    originalFileName: string,
  ): Promise<IS3SignedUrlResponse> {
    const key: string = `${folder}/${fileName}`;
    return this.getSignedUrlPromise(key, originalFileName, this.expiresIn);
  }

  public async getSignedUrlPromise(
    key: string,
    fileName: string,
    expiresIn: number,
  ): Promise<IS3SignedUrlResponse> {
    const presignedUrl: string = await this.s3.getSignedUrlPromise(
      'getObject',
      {
        Bucket: this.bucket,
        Key: key,
        Expires: expiresIn,
        ResponseContentDisposition: `attachment; filename=${fileName}`,
      },
    );
    return { url: presignedUrl, expiresIn };
  }

  public async uploadFile(folder: string, fileName: string, data: any): Promise<void> {
    const key: string = folder + fileName;
    const putObjectParams = {
      Bucket: this.bucket,
      Key: key,
      Body: data,
    };
    try {
      await this.s3.putObject(putObjectParams).promise();
    } catch (err) {
      throw new Error('Error Uploading file');
    }
  }

  public checkFileExists(fileName: string, files: any): boolean {
    for (const file of files) {
      if (file.entryName === fileName) {
        return false;
      }
    }
    return true;
  }

  public async downloadFile(
    folder: string,
    fileName: string,
  ): Promise<PromiseResult<AWS.S3.GetObjectOutput, AWS.AWSError>> {
    const key: string = folder + fileName;
    const getObjectParams = {
      Bucket: this.bucket,
      Key: key,
    };
    try {
      const resp = await this.s3.getObject(getObjectParams).promise();
      return resp;
    } catch (err) {
      throw new Error('Error downloading file');
    }
  }
}
