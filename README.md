# Hypercolor Code Push Manager

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [License](LICENSE)
- [More Information](#more-information)
    - [Toolchain](#toolchain)
    - [Project Repository](#project-repository)
    - [Organization Repository](#organization-repository)

## Motivation

This is a more complete port of Microsoft's CodePush package. While building a proof of concept to introduce this
toolset, I found that the Microsoft package did not suit our needs with type safety. As a result, I have created this
helper package that supports a CodePushManager class with type safe methods.

## Introduction

This tool is used by the team at Hypercolor Digital to send over the air (OTA) code deployment updates to React Native
apps. This tool is engineered to support three environments: dev, demo and prod.

The main dependency of this package, MS's CodePush package, uses dependencies that are
out of date and can may cause security vulnerabilities. For this reason, it is strongly
recommended to install this package as a dev dependency.

This package is meant to be used as a tool to automate the deployment process, not as a dependency in your server or
frontend code. This package is not meant to be used in a production environment.

## Installation

Install this package using your package manager of choice.

- NPM
    - `npm i @hypercolor/code-push --save`
- Yarn
    - `yarn add @hypercolor/code-push -D`

## Usage

In order to use this tool, you will need to have a CodePush account and an API token. This is accomplished through the
appcenter CLI. You can find more information about Microsoft's CodePush
package [here](https://microsoft.github.io/code-push/).

### Step 1: Create your app

Example

```typescript
import { CodePushManager, CodePushApp } from '@hypercolor/code-push';

const codePushManager = new CodePushManager(
    process.env.CODE_PUSH_API_TOKEN,
    process.env.CODE_PUSH_APP_NAME
);

const exampleFunction = async (): Promise<CodePushApp> => {
  const app = await codePushManager.createApp(CodePushOs.iOS);
  console.log("New App created: ", app);
  return app;
};
```

### Step 2: Create your deployment(s)

Deployments are the environments that you will be deploying to. You can create as many as you want, but you will need
to create at least one. The deployment name should be the same as the environment name. The deployment name is used to
identify the deployment when you are releasing a new version of your app.

Example:

```typescript
import { CodePushManager, CodePushDeployment } from '@hypercolor/code-push';

const codePushManager = new CodePushManager(
    process.env.CODE_PUSH_API_TOKEN,
    process.env.CODE_PUSH_APP_NAME
);

const exampleFunction = async (environmentName: string): Promise<CodePushDeployment> => {
  const deployment = await codePushManager.createDeployment('dev', CodePushOs.iOS);
  console.log("New Deployment created: ", deployment);
  return app;
};

```

### Step 3: Create your bundle(s)

After installing this package, you need to create a bundle directory to house your code bundles. This directory should
be in the root of your project and should be named `bundles`. This directory is ignored by git and should not be checked
in. Whenever you want to create a new bundle, you can run the following command in the root of your frontend project:

iOS:

```bash
react-native bundle --platform ios --entry-file index.js --bundle-output ./bundle/CodePush/ios/main.jsbundle --assets-dest ./bundle/CodePush/ios --dev false
```

Android:

```bash
react-native bundle --platform android --entry-file index.js --bundle-output ./bundle/CodePush/android/main.jsbundle --assets-dest ./bundle/CodePush/android --dev false
```

### Step 4: Release your bundle(s)

After running this command, you should see a new directory in your `bundles` directory named `CodePush`. This directory
should contain two directories: `ios` and `android`. These will be the corresponding bundles that will be uploaded to
CodePush.

While deploying, two flags to note are `isMandatory` and `isDisabled`. `isMandatory` is used to force the user to update
their app. `isDisabled` is used to disable the deployment. This is useful if you want to disable a deployment without
deleting it, or if you want to stage a release without making it available to the public at a given time.

Example

```typescript
import { CodePushManager } from '@hypercolor/code-push';

const codePushManager = new CodePushManager(
    process.env.CODE_PUSH_API_TOKEN,
    process.env.CODE_PUSH_APP_NAME
);

const exampleFunction = async (
    deploymentName: string,
    os: CodePushOs,
    isMandatory: boolean,
    version?: string,
    description?: string,
    isDisabled?: boolean
): Promise<void> => {

  const filePath = './bundle/CodePush/ios/main.jsbundle';

  await codePushManager.releaseDeployment(
      os,
      deploymentName,
      filePath,
      version,
      {
        description,
        isMandatory,
        isDisabled,
      },
  );
};
```

### Step 5: Promote your release

Let's say there is a bundle in the dev environment that is ready to be promoted to demo or production. Rather than
re-bundling the project and targeting the new environment, you can promote the release to the new environment from an
existing deployment. This will
create a new release in the new environment with the same bundle as the old environment, while also keeping the released
deployment in place.

Example:

```typescript
import { CodePushManager, CodePushDeployment } from '@hypercolor/code-push';

const codePushManager = new CodePushManager(
        process.env.CODE_PUSH_API_TOKEN,
        process.env.CODE_PUSH_APP_NAME
);

const exampleFunction = async (
        os: CodePushOs,
        sourceDeploymentName: string,
        destinationDeploymentName: string,
): Promise<CodePushDeployment> => {

  const promoted = await codePushManager.promoteDeployment(
          os,
          sourceDeploymentName,
          destinationDeploymentName,
  );
  console.log("Promoted: ", promoted);
  return promoted;
};
```

### Step 6: Rollback your release

Oops! Let's say we need to rollback a release. This can be done by specifying the deployment name and the target release
version. This will create a new release with the same bundle as the target release, while also keeping the released
deployment in place. NOTE: If the deployment history is cleared, this option will have no effect.

Example:

```typescript
import { CodePushManager } from '@hypercolor/code-push';

const codePushManager = new CodePushManager(
    process.env.CODE_PUSH_API_TOKEN,
    process.env.CODE_PUSH_APP_NAME
);

const exampleFunction = async (
    deploymentName: string,
    os: CodePushOs,
    targetRelease: string,
): Promise<void> => {
  await codePushManager.rollbackDeployment(
      os,
      deploymentName,
      targetRelease,
  );
};
```

## Misc Info

### Toolchain

- TypeScript
- code-push

#### [Project Repository](https://github.com/hypercolor/code-push)

#### [Organization Repository](https://github.com/hypercolor/)
