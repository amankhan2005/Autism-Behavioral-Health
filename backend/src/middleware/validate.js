import { ApiError } from '../utils/ApiError.js';

// Validates req.body against a Zod schema; replaces body with parsed data.
export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const fields = result.error.flatten().fieldErrors;
    return next(new ApiError(400, 'Please check the form and try again.', fields));
  }
  req.body = result.data;
  next();
};
