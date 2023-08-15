import { BlobInfo } from './blob-info';

export interface PackageHashToBlobInfoMap {
  [packageHash: string]: BlobInfo;
}
