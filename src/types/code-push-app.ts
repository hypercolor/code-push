import { CodePushCollaboratorMap } from './code-push-collaborator-map';
import { CodePushOs } from '../enums/code-push-os';

export interface CodePushApp {
  collaborators?: CodePushCollaboratorMap;
  name: string;
  deployments?: string[];
  os?: CodePushOs;
  platform?: string;
}
