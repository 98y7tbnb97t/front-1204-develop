import { User } from "../User";
import { ICounter } from "../ICounter";
import { TestUser } from "../TestUser";

export interface IgetUsers {
    users: User[];
    testUsers: TestUser[];
}

export interface IgetUser {
    user: User;
}

export interface IacceptEdits {
    user: User;
}

export interface IgetUsersCounter {
    counters: ICounter;
}