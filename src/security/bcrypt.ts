import { compareSync, genSaltSync, hashSync } from 'bcrypt';

const SALT_ROUNDS = 10;

export function hash(password: string): string {
    return hashSync(password, genSaltSync(SALT_ROUNDS));
}

export function compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
}

