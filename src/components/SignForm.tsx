import React, { SyntheticEvent, memo } from 'react';
import { Button, Form, Image } from 'react-bootstrap';

type SignFormProps = {
  title: string;
  imageSrc: string;
  btnName: string;
  onSubmit: (e: SyntheticEvent<EventTarget>) => void;
  children: React.ReactNode;
}

export const SignForm = memo((props: SignFormProps) => {
  const {
    title,
    imageSrc,
    btnName,
    onSubmit,
    children
  } = props;

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex w-75 justify-content-center align-items-center">
        <div className="w-25 m-3">
          <Image src={imageSrc} alt={title} fluid />
        </div>
        <div className="w-50">
          <h1 className="text-warning">{title}</h1>
          <Form onSubmit={onSubmit} className="d-flex flex-column gap-3">
            {children}
            <Button variant="outline-warning" type="submit">{btnName}</Button>
          </Form>
        </div>
      </div>
    </main>
  );
});

SignForm.displayName = 'SignForm';
