import {test} from 'vitest'
import {makeExecutableSchema} from "@graphql-tools/schema";
import {getFields} from "../src/schema";
import {TransformObjectFields, wrapSchema} from "@graphql-tools/wrap";
import {getNullableType} from "graphql/type";
import {printSchema} from "graphql/utilities";


test('test', () => {
    const schema = makeExecutableSchema({
        typeDefs: /* GraphQL */ `
            type Query {
                world: String
                hello: String!
            }
        `,
    })

    const fields = getFields(schema, 'Query')
    console.log(fields)

    // удаляем восклицательные знаки с полей
    const wrappedSchema = wrapSchema({
        schema,
        transforms: [
            new TransformObjectFields((typeName, fieldName, fieldConfig) => {
                if(typeName !== 'Query') return
                return [
                    fieldName,
                    {
                        ...fieldConfig,
                        type: getNullableType(fieldConfig.type)
                    }
                ]
            })
        ]
    })

    console.log(printSchema(wrappedSchema))

    // expect(1).toBe(1)
})