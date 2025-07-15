import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Layout } from '../layouts/layout.tsx';
import { isAxiosError } from 'axios';

type IErrorWithMessage = {
  message: string;
}

type IErrorWithStatus = {
  status: number;
}

const hasMessage = (error: unknown): error is IErrorWithMessage => {
  return typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
}

const hasStatus = (error: unknown): error is IErrorWithStatus => {
  return typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
}

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  let message = 'Что-то пошло не так';
  let status = hasStatus(error) ? error.status : 500;

  if (isAxiosError(error)) {
    message = error.message;
    if (error?.response?.data) {
      message = error.response.data.message;
      status = error.response.data.statusCode;
    }
  }

  if (hasMessage(error) && error.message.includes('Failed to fetch')) {
    message = 'Отсутствует интернет-соединение';
  }

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = 'Страница не найдена';
    }
    if (error.status === 503) {
      message = 'Ошибка на сервере';
    }
  }

  return (
    <Layout>
      <div className='flex flex-col gap-10 w-full h-full justify-center items-center mt-20'>
        <div className='text-2xl font-bold'>{ status }</div>
        <div>{ message }</div>
      </div>
    </Layout>
  )
};
