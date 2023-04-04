import { Dispatch, SetStateAction } from "react";

type Query = {
    login: (args: { password: string, username: string }) => UserRegistration;
    photos: (args: { lat: string, long: string }) => Photo[];
};

type Mutation = {
    newUser: (args: { password: string, username: string }) => UserRegistration;
    newPhoto: (args: { input: NewPhoto }) => Photo;
};

type User = {
    id: string;
    username: string;
};

export type UserRegistration = {
    id: string;
    username: string;
    jwt: string;
};

type Photo = {
    id: string;
    url: string;
    location: LocationGeo;
    user: User;
};

type LocationGeo = {
    type: string;
    coordinates: number[];
};

type NewPhoto = {
    url: string;
    lat: string;
    long: string;
    userId: string;
};

export type GlobalContext = {
    logged: boolean;
    setLogged: Dispatch<SetStateAction<boolean>>;
    user: UserRegistration;
    setUser: Dispatch<SetStateAction<UserRegistration>>;
}