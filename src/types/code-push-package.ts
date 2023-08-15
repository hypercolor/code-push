import { PackageHashToBlobInfoMap } from './package-hash-to-blob-info-map';
import { CodePushPackageInformation } from './code-push-package-information';

export interface CodePushPackage extends CodePushPackageInformation {
  blobUrl: string;
  diffPackageMap?: PackageHashToBlobInfoMap;
  originalLabel?: string;
  originalDeployment?: string;
  releasedBy?: string;
  releaseMethod?: string;
  size: number;
  uploadTime: number;
}
