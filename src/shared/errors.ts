import HttpStatusCodes from 'http-status-codes';


export abstract class CustomError extends Error {

    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}

export class NotFoundError extends CustomError {
    constructor(msg: string) {
        super(msg, HttpStatusCodes.NOT_FOUND);
    }
}

export class LoginUnsuccessfulError extends CustomError {
    constructor(msg: string) {
        super(msg, HttpStatusCodes.UNAUTHORIZED);
    }
}

export class InvalidParameterError extends CustomError {
    constructor(msg: string) {
        super(msg, HttpStatusCodes.BAD_REQUEST);
    }
}

export class UserIsAlreadyExistedError extends CustomError {
    constructor(msg: string) {
        super(msg, HttpStatusCodes.CONFLICT);
    }
}

export class InvalidJWTTokenError extends CustomError {
    constructor(msg: string) {
        super(msg, HttpStatusCodes.UNAUTHORIZED);
    }
}

export class NotLoggedInError extends CustomError {
    constructor(msg: string) {
        super(msg, HttpStatusCodes.UNAUTHORIZED);
    }
}
export class RoomNotFoundError extends CustomError {
    constructor(msg: string) {
        super(msg, HttpStatusCodes.NOT_FOUND);
    }
}