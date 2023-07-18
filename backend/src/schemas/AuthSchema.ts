import {Type} from '@sinclair/typebox';
import Ajv from 'ajv';

// Criar uma instância do Ajv
const ajv = new Ajv({coerceTypes: true});
export default class AuthSchema {
    login = {
        body: Type.Object({
            email: Type.String({minLength: 10, maxLength: 50, format: "email"}),
            password: Type.String({minLength: 4, maxLength: 20}),
        })
    };
    register = {
        body: Type.Object({
            name: Type.String({minLength: 1, maxLength: 30}),
            email: Type.String({minLength: 10, maxLength: 50, format: "email"}),
            password: Type.String({minLength: 4, maxLength: 20}),
            confirmPassword: Type.String({minLength: 4, maxLength: 20}),
        })
    };
    logout = {
        params: Type.Object({
            id: Type.Integer({minimum: 1})
        })
    }
}
