import { ProjectCompilerOptions, ProjectCompileResult } from './solidity/SolidityProjectCompiler';
import ProjectFile from '../files/ProjectFile';
export declare function compile(compilerOptions?: ProjectCompilerOptions, projectFile?: ProjectFile, force?: boolean): Promise<void>;
export declare function compileWithSolc(compilerOptions?: ProjectCompilerOptions): Promise<ProjectCompileResult>;
export declare function compileWithTruffle(): Promise<void>;
export declare function resetState(): void;
