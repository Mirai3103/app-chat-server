
import { UserInput } from "../models/User.model";
import { InvalidParameterError } from "../shared/errors";
const GENDERS = ['MALE', 'FEMALE', 'ORTHER']
export const validateUserInput = (data: UserInput) => {
    console.log(data)
    if (data.fullName === undefined || data.fullName === null || data.fullName.trim() == '') {
        throw new InvalidParameterError('Full name is not valid');
    }
    if (data.username === undefined || data.username === null || data.username.trim() == '') {
        throw new InvalidParameterError('Username is not valid');
    }
    if (data.password === undefined || data.password === null || data.password.trim() == '') {
        throw new InvalidParameterError('Password is not valid');
    }
    if (data.password === undefined || data.password === null || data.password.trim() == '' || !GENDERS.includes(data.gender.toUpperCase())) {
        throw new InvalidParameterError("Gender is not valid");
    }

}