import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal,
    email
} from 'vuelidate/lib/validators';
import * as mb from "@/helpers/loaders/model.load"

export const validations = {
    person: {
        first_name: {
            required,
        },
        last_name: {
            required,
        },
        sex: {
            required,
        },
        age: {
            required,
            integer,
        },
        email: {
            required,
            email,
        },
    },
}
export const feedbacks = {
    person: {
        email: {
            isUnique: 'Ya existe un email'
        },
    },
}
