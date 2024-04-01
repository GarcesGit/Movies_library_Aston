import React from 'react';

export interface Data {
  [key: string]: string;
}

export interface User{
  username: string;
  password: string;
}

export interface SigninUser extends User  {
  isSignIn: boolean;
}

export interface SignupUser extends User {
  confirmPassword: string;
}

export interface Users {
  [key: string]: User,
}

export type SignInputProps<T> = {
  label: string;
  name: keyof T;
  type: string;
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  isInvalid: boolean;
  errors: Data,
  mRef?: React.Ref<HTMLInputElement> | null;
}
