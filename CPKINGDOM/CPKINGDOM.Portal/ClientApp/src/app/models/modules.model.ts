export interface Module {
    moduleId: number;
    moduleName: string;
    route: string;
    parentId: number;
    submodules: Array<Module>;
}