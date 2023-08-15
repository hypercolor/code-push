"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodePushManager = void 0;
const CodePush = require('code-push');
class CodePushManager {
    constructor(token, appName) {
        this.token = token;
        this.appName = appName;
        this.codePush = new CodePush(this.token);
    }
    async createApp(os, verbose) {
        try {
            const app = await this.codePush.addApp(this.appName + '-' + os, //app name
            os, 'React-Native', //deployment platform
            true);
            if (verbose) {
                console.log('CodePushApp created: ', app);
            }
            return app;
        }
        catch (err) {
            throw new Error('Error creating app: ' + err);
        }
    }
    async createDeployment(deploymentName, os, verbose) {
        try {
            const deployment = await this.codePush.addDeployment(this.appName + '-' + os, deploymentName);
            if (verbose) {
                console.log('CodePushDeployment created: ', deployment);
            }
            return deployment;
        }
        catch (err) {
            throw new Error('Error creating deployment: ' + err);
        }
    }
    async getAppData(os, verbose) {
        try {
            const appData = await this.codePush.getApp(this.appName + '-' + os);
            if (verbose) {
                console.log('CodePushApp data: ', appData);
            }
            return appData;
        }
        catch (err) {
            throw new Error('Error getting app data: ' + err);
        }
    }
    async getDeployData(os, deploymentName, verbose) {
        try {
            const deploymentData = await this.codePush.getDeployment(this.appName + '-' + os, deploymentName);
            if (verbose) {
                console.log('CodePushDeployment data: ', deploymentData);
            }
            return deploymentData;
        }
        catch (err) {
            throw new Error('Error getting deployment data: ' + err);
        }
    }
    async getDeployHistory(os, deploymentName, verbose) {
        try {
            const deploymentHistory = await this.codePush.getDeploymentHistory(this.appName + '-' + os, deploymentName);
            if (verbose) {
                console.log('CodePushDeployment history: ', deploymentHistory);
            }
            return deploymentHistory;
        }
        catch (err) {
            throw new Error('Error getting deployment history: ' + err);
        }
    }
    async getDeployMetrics(os, deploymentName, verbose) {
        try {
            const deploymentMetrics = await this.codePush.getDeploymentMetrics(this.appName + '-' + os, deploymentName);
            if (verbose) {
                console.log('CodePushDeployment metrics: ', deploymentMetrics);
            }
            return deploymentMetrics;
        }
        catch (err) {
            throw new Error('Error getting deployment metrics: ' + err);
        }
    }
    async patchDeployment(os, deploymentName, label, updateMetadata, verbose) {
        try {
            await this.codePush.patchRelease(this.appName + '-' + os, deploymentName, label, updateMetadata);
            if (verbose) {
                console.log('Release patched');
            }
            return;
        }
        catch (err) {
            throw new Error('Error patching release: ' + err);
        }
    }
    async promoteDeployment(os, sourceDeploymentName, destinationDeploymentName, verbose) {
        try {
            const promoted = await this.codePush.promote(this.appName + '-' + os, sourceDeploymentName, destinationDeploymentName);
            if (verbose) {
                console.log('Deployment promoted');
            }
            return promoted;
        }
        catch (err) {
            throw new Error('Error promoting deployment: ' + err);
        }
    }
    async rollbackDeployment(os, deploymentName, targetRelease, verbose) {
        try {
            await this.codePush.rollback(this.appName + '-' + os, deploymentName, targetRelease);
            if (verbose) {
                console.log('Rollback Requested');
            }
            return;
        }
        catch (err) {
            throw new Error('Error rolling back deployment: ' + err);
        }
    }
    async releaseDeployment(os, deploymentName, filePath, targetBinaryVersion, updateMetadata, verbose) {
        const uploadProgressCallback = (progress) => {
            console.log(`Upload progress: ${progress}%`);
        };
        try {
            await this.codePush.release(this.appName + '-' + os, deploymentName, filePath, targetBinaryVersion, updateMetadata, uploadProgressCallback);
            if (verbose) {
                console.log('Release Requested');
            }
            return;
        }
        catch (err) {
            throw new Error('Error releasing deployment: ' + err);
        }
    }
}
exports.CodePushManager = CodePushManager;
//# sourceMappingURL=code-push-manager.js.map