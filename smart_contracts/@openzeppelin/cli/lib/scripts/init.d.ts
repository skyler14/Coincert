import { InitParams } from './interfaces';
export default function init({ name, version, publish, dependencies, installDependencies, force, projectFile, }: InitParams): Promise<void | never>;
