import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactPageSchema, contactPageDefaults } from '@/lib/validation/contactPage.schema.js';
import { useSubmitForm } from '@/hooks/useSubmitForm.js';
import { useMathCaptcha } from '@/hooks/useMathCaptcha.js';
import { Field, TextArea, Checkbox, Honeypot } from './fields.jsx';
import MathCaptcha from './MathCaptcha.jsx';
import SubmitButton from './SubmitButton.jsx';

export default function ContactPageForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactPageSchema), defaultValues: contactPageDefaults,
  });
  const captcha = useMathCaptcha();
  const { onSubmit, submitting } = useSubmitForm('/contact', {
    reset: () => { reset(); captcha.regenerate(); },
  });

  // Map first/last -> fullName so the existing backend contract is unchanged.
  const submit = ({ firstName, lastName, ...rest }) => {
    if (!captcha.solved) return;
    onSubmit({ fullName: `${firstName} ${lastName}`.trim(), ...rest });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="relative space-y-4" noValidate>
      <Honeypot register={register} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" error={errors.firstName?.message} {...register('firstName')} />
        <Field label="Last name" name="lastName" required autoComplete="family-name" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
      <Field label="Subject (optional)" name="subject" error={errors.subject?.message} {...register('subject')} />
      <TextArea label="Message" name="message" required error={errors.message?.message} {...register('message')} />
      <Checkbox label="I agree to be contacted about my inquiry." name="consent" {...register('consent')} error={errors.consent?.message} />
      <MathCaptcha {...captcha.fieldProps} />
      <SubmitButton submitting={submitting} disabled={!captcha.solved}>Send message</SubmitButton>
    </form>
  );
}
