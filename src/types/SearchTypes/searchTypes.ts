import React from 'react';

export interface Search {
  title: string;
  year?: string;
}

export interface Film {
  [key: string]: string;
}

export interface Film {
  titleError: string;
  yearError: string;
}

export type SearchInputProps<T> = {
  label: string;
  name: keyof T;
  type: string;
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  filmRef?: React.Ref<HTMLInputElement> | null;
};
