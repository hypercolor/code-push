import { CodePushPackageInformation } from '../types/code-push-package-information';
import { CodePushDeployment } from '../types/code-push-deployment';
import { CodePushApp } from '../types/code-push-app';
import { CodePushPackage } from '../types/code-push-package';
import { CodePushDeploymentMetrics } from '../types/code-push-deployment-metrics';
import { CodePushOs } from '../enums/code-push-os';

const CodePush = require('code-push');

export class CodePushManager {
  constructor(private token: string, private appName: string) {
    this.codePush = new CodePush(this.token);
  }
  private codePush: {[key: string]: Function};

  public async createApp(os: CodePushOs, verbose?: boolean): Promise<CodePushApp> {
    try {
      const app: CodePushApp = await this.codePush.addApp(
          this.appName + '-' + os, //app name
          os,
          'React-Native', //deployment platform
          true, //flag to not set default deployment names
      );
      if (verbose) {
        console.log('CodePushApp created: ', app);
      }
      return app;
    }
    catch (err: any) {
      throw new Error('Error creating app: ' + err);
    }
  }

  public async createDeployment(deploymentName: string, os: CodePushOs, verbose?: boolean): Promise<CodePushDeployment> {
    try {
      const deployment: CodePushDeployment = await this.codePush.addDeployment(this.appName + '-' + os, deploymentName);
      if (verbose) {
        console.log('CodePushDeployment created: ', deployment);
      }
      return deployment;
    }
    catch (err: any) {
      throw new Error('Error creating deployment: ' + err);
    }
  }

  public async getAppData(os: CodePushOs, verbose?: boolean): Promise<CodePushApp> {
    try {
      const appData: CodePushApp = await this.codePush.getApp(this.appName + '-' + os);
      if (verbose) {
        console.log('CodePushApp data: ', appData);
      }
      return appData;
    }
    catch (err: any) {
      throw new Error('Error getting app data: ' + err);
    }
  }

  public async getDeployData(os: CodePushOs, deploymentName: string, verbose?: boolean): Promise<CodePushDeployment> {
    try {
      const deploymentData = await this.codePush.getDeployment(this.appName + '-' + os, deploymentName);
      if (verbose) {
        console.log('CodePushDeployment data: ', deploymentData);
      }
      return deploymentData;
    }
    catch (err: any) {
      throw new Error('Error getting deployment data: ' + err);
    }
  }

  public async getDeployHistory(os: CodePushOs, deploymentName: string, verbose?: boolean): Promise<CodePushPackage[]> {
    try {
      const deploymentHistory = await this.codePush.getDeploymentHistory(this.appName + '-' + os, deploymentName);
      if (verbose) {
        console.log('CodePushDeployment history: ', deploymentHistory);
      }
      return deploymentHistory;
    }
    catch (err: any) {
      throw new Error('Error getting deployment history: ' + err);
    }
  }

  public async getDeployMetrics(os: CodePushOs, deploymentName: string, verbose?: boolean): Promise<CodePushDeploymentMetrics> {
    try {
      const deploymentMetrics = await this.codePush.getDeploymentMetrics(this.appName + '-' + os, deploymentName);
      if (verbose) {
        console.log('CodePushDeployment metrics: ', deploymentMetrics);
      }
      return deploymentMetrics;
    }
    catch (err: any) {
      throw {code: 500, message: 'Error Getting deployment metrics', error: err};
    }
  }

  public async patchDeployment(os: CodePushOs, deploymentName: string, label: string, updateMetadata: CodePushPackageInformation, verbose?: boolean): Promise<void> {
    try {
      await this.codePush.patchRelease(this.appName + '-' + os, deploymentName, label, updateMetadata);
      if (verbose) {
        console.log('Release patched');
      }
      return;
    }
    catch (err: any) {
      throw {code: 500, message: 'Error patching deployment', error: err};
    }
  }

  public async promoteDeployment(os: CodePushOs, sourceDeploymentName: string, destinationDeploymentName: string, verbose?: boolean): Promise<CodePushPackage> {
    try {
      const promoted = await this.codePush.promote(this.appName + '-' + os, sourceDeploymentName, destinationDeploymentName);
      if (verbose) {
        console.log('Deployment promoted');
      }
      return promoted;
    }
    catch (err: any) {
      throw {code: 500, message: "Error promoting deployment",error: err};
    }
  }

  public async rollbackDeployment(os: CodePushOs, deploymentName: string, targetRelease?: string, verbose?: boolean): Promise<void> {
    try {
      await this.codePush.rollback(this.appName + '-' + os, deploymentName, targetRelease);
      if (verbose) {
        console.log('Rollback Requested');
      }
      return;
    }
    catch (err: any) {
      throw {code: 500, message: 'Error rolling back deployment',error: err};
    }
  }

  public async releaseDeployment(os: CodePushOs, deploymentName: string, filePath: string, targetBinaryVersion: string, updateMetadata: CodePushPackageInformation, verbose?: boolean): Promise<CodePushPackage> {

    const uploadProgressCallback = (progress: number) => {
      console.log(`Upload progress: ${progress}%`);
    }

    try {
      const release = await this.codePush.release(
        this.appName + '-' + os,
        deploymentName,
        filePath,
        targetBinaryVersion,
        updateMetadata,
        uploadProgressCallback,
      );
      if (verbose) {
        console.log('Release Requested', release);
      }
      return release;
    }
    catch (err: any) {
      throw {code: 500, message: 'Error releasing deployment',error: err};
    }
  }
}
