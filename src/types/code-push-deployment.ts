import { CodePushPackage } from './code-push-package';

export interface CodePushDeployment {
  /*generated key*/ key?: string;
  /*key*/ name: string;
  /*generated*/ package?: CodePushPackage
}
