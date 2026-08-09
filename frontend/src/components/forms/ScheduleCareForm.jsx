import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { careSchema, careDefaults } from '@/lib/validation/careRequest.schema.js';
import { useSubmitForm } from '@/hooks/useSubmitForm.js';
import { useMathCaptcha } from '@/hooks/useMathCaptcha.js';
import { services } from '@/content/services.js';
import { Field, TextArea, Select, Checkbox, Honeypot } from './fields.jsx';
import MathCaptcha from './MathCaptcha.jsx';
import SubmitButton from './SubmitButton.jsx';

export default function ScheduleCareForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(careSchema), defaultValues: careDefaults,
  });
  const captcha = useMathCaptcha();
  const { onSubmit, submitting } = useSubmitForm('/schedule-care', {
    reset: () => { reset(); captcha.regenerate(); },
  });
  const guardedSubmit = (values) => { if (captcha.solved) onSubmit(values); };

  return (
    <form onSubmit={handleSubmit(guardedSubmit)} className="relative space-y-4" noValidate>
      <Honeypot register={register} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Parent / caregiver name" name="fullName" required autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email?.message} {...register('email')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
        <Field label="Child's first name (optional)" name="childFirstName" error={errors.childFirstName?.message} {...register('childFirstName')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Child's age range" name="childAgeRange" required error={errors.childAgeRange?.message} {...register('childAgeRange')}>
          <option value="">Select an age range</option>
          <option value="0-2">0–2 years</option>
          <option value="3-5">3–5 years</option>
          <option value="6-9">6–9 years</option>
          <option value="10-13">10–13 years</option>
          <option value="14-17">14–17 years</option>
        </Select>
        <Select label="Service of interest (optional)" name="serviceInterest" error={errors.serviceInterest?.message} {...register('serviceInterest')}>
          <option value="">No preference</option>
          {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Preferred contact" name="preferredContact" {...register('preferredContact')}>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </Select>
        <Select label="Best time to reach you" name="preferredTime" {...register('preferredTime')}>
          <option value="anytime">Anytime</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </Select>
      </div>
      <TextArea label="Anything you'd like us to know? (optional)" name="message" error={errors.message?.message} {...register('message')} />
      <Checkbox label="I agree to be contacted about scheduling care." name="consent" {...register('consent')} error={errors.consent?.message} />
      <MathCaptcha {...captcha.fieldProps} />
      <SubmitButton submitting={submitting} disabled={!captcha.solved}>Request care</SubmitButton>
    </form>
  );
}
