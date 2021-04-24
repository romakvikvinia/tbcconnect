import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  username: Yup.string().min(3, 'MIn Length'),
  password: Yup.string().min(3, 'MIn Length'),
});
