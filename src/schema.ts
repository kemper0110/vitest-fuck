import {GraphQLSchema} from "graphql/type";

export function getFields(schema: GraphQLSchema, typeName: string): string[] {
    // @ts-ignore
    return Object.keys(schema.getType(typeName)?.toConfig().fields ?? {})
}