import * as yup from 'yup';

export const SignupValidationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', 'Пароли должны совпадать', (value, context) => value === context.parent.password),
});
