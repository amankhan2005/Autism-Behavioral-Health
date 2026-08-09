export const ok = (res, status, message, data = undefined) =>
  res.status(status).json({ success: true, message, ...(data !== undefined && { data }) });
