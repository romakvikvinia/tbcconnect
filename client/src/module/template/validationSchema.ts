import * as Yup from 'yup';

export const TemplateSchema = Yup.object().shape({
  title: Yup.string().min(3, 'MIn Length').required('Required'),
  description: Yup.string().min(3, 'MIn Length').required('Required'),
});
