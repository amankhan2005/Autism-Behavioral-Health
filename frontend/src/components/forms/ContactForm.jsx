import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, contactDefaults } from '@/lib/validation/contact.schema.js';
import { useSubmitForm } from '@/hooks/useSubmitForm.js';
import { Field, TextArea, Checkbox, Honeypot } from './fields.jsx';
import SubmitButton from './SubmitButton.jsx';

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema), defaultValues: contactDefaults,
  });
  const { onSubmit, submitting } = useSubmitForm('/contact', { reset });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4" noValidate>
      <Honeypot register={register} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="fullName" required autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
        <Field label="Subject (optional)" name="subject" error={errors.subject?.message} {...register('subject')} />
      </div>
      <TextArea label="How can we help?" name="message" required error={errors.message?.message} {...register('message')} />
      <Checkbox label="I agree to be contacted about my inquiry." name="consent" {...register('consent')} error={errors.consent?.message} />
      <SubmitButton submitting={submitting}>Send message</SubmitButton>
    </form>
  );
}
