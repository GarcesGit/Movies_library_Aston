import React, { useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import telegramImg from '../assets/images/telegram.svg';

type TelegramButtonProps = {
  id: string;
};

const getTelegramURL = ({ id }: TelegramButtonProps) => {
  const url = `www.imdb.com/title/`;
  return `https://t.me/share/url?url=${encodeURIComponent(url)}${id}`;
};

export const TelegramButton = (props: TelegramButtonProps) => {
  const handleClick = useCallback(() => {
    const encodeURL = getTelegramURL(props);
    window.open(encodeURL, '_blank');
  }, [props]);

  return (
    <Button onClick={handleClick} variant="outline-warning" className="mb-2">
      <Image src={telegramImg} />
      Поделиться
    </Button>
  );
};
