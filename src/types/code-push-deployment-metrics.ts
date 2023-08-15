import { CodePushUpdateMetrics } from './code-push-update-metrics';

export interface CodePushDeploymentMetrics {
  [packageLabelOrAppVersion: string]: CodePushUpdateMetrics
}
