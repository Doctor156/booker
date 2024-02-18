import { BuildOptions, Model } from "sequelize";

export type TModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Model;
}
