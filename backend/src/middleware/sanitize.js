import xss from 'xss';

const clean = (val) => {
  if (typeof val === 'string') return xss(val.trim(), { whiteList: {}, stripIgnoreTag: true }).trim();
  if (Array.isArray(val)) return val.map(clean);
  if (val && typeof val === 'object') {
    return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, clean(v)]));
  }
  return val;
};

// Strips HTML/script from all string inputs in the request body.
export const sanitizeBody = (req, _res, next) => {
  if (req.body && typeof req.body === 'object') req.body = clean(req.body);
  next();
};
