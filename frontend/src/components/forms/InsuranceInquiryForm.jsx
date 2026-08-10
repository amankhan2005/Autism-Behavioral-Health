import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insuranceSchema, insuranceDefaults } from '../../lib/validation/insurance.schema.js';
import { useSubmitForm } from '../../hooks/useSubmitForm.js';
import { useMathCaptcha } from '../../hooks/useMathCaptcha.js';
import { Field, TextArea, Checkbox, Honeypot } from './fields.jsx';
import MathCaptcha from './MathCaptcha.jsx';
import SubmitButton from './SubmitButton.jsx';

export default function InsuranceInquiryForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(insuranceSchema), defaultValues: insuranceDefaults,
  });
  const captcha = useMathCaptcha();
  const { onSubmit, submitting } = useSubmitForm('/insurance-inquiry', {
    reset: () => { reset(); captcha.regenerate(); },
  });
  const guardedSubmit = (values) => { if (captcha.solved) onSubmit(values); };

  return (
    <form onSubmit={handleSubmit(guardedSubmit)} className="relative space-y-4" noValidate>
      <Honeypot register={register} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="fullName" required autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
        <Field label="Insurance provider" name="insuranceProvider" required error={errors.insuranceProvider?.message} {...register('insuranceProvider')} />
      </div>
      <Field label="Member ID (optional)" name="memberId" error={errors.memberId?.message} {...register('memberId')} />
      <TextArea label="Questions about your coverage? (optional)" name="message" error={errors.message?.message} {...register('message')} />
      <Checkbox label="I agree to be contacted about my insurance inquiry." name="consent" {...register('consent')} error={errors.consent?.message} />
      <MathCaptcha {...captcha.fieldProps} />
      <SubmitButton submitting={submitting} disabled={!captcha.solved}>Verify my benefits</SubmitButton>
    </form>
  );
}
