import { relative } from 'node:path';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import command from './command.mjs';
import { DEFAULT_REACT_NATIVE_PATH, REACT_NATIVE_NAMESPACE } from '../constants.mjs';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  beforeQueue() {
    if (this.blueprintConfig.appDir) {
      throw new Error('jhipster-reactNative:app generator must run in backend application directory');
    }
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializingTemplateTask() {
        this.parseJHipsterArguments(command.arguments);
        this.parseJHipsterOptions(command.options);
      },
      loadConfigFromJHipster() {
        if (this.options.defaults || this.options.force) {
          this.blueprintStorage.defaults({ reactNativeDir: DEFAULT_REACT_NATIVE_PATH });
        }
      },
    });
  }

  get [BaseApplicationGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      async promptyForReactNativeDir() {
        await this.prompt(
          [
            {
              type: 'input',
              name: 'reactNativeDir',
              message: 'Where do you want to generate an ReactNative application?',
              default: DEFAULT_REACT_NATIVE_PATH,
            },
          ],
          this.blueprintStorage,
        );
        this.blueprintStorage.defaults({ reactNativeDir: DEFAULT_REACT_NATIVE_PATH });
      },
    });
  }

  get [BaseApplicationGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composeReactNative() {
        if (this.jhipsterConfig.applicationType === 'microservice') return;
        const reactNativeDir = this.destinationPath(this.blueprintConfig.reactNativeDir);
        const appDir = relative(reactNativeDir, this.destinationPath());
        await this.composeWithJHipster(`${REACT_NATIVE_NAMESPACE}:reactNative`, {
          generatorOptions: {
            destinationRoot: reactNativeDir,
            appDir,
          },
        });
      },
    });
  }
}
