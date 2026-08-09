const BRAND = '#135C9C';
const LEAF = '#2E9E7B';

const rowsToHtml = (rows) =>
  rows
    .filter((r) => r && r.value)
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;width:170px;vertical-align:top;">${r.label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;color:#1E293B;font-size:14px;">${String(r.value).replace(/\n/g, '<br>')}</td>
      </tr>`
    )
    .join('');

/**
 * Branded HTML email shell.
 * @param {{heading:string, intro:string, rows?:Array<{label:string,value:any}>, footnote?:string}} opts
 */
export const layout = ({ heading, intro, rows = [], footnote = '' }) => {
  const table = rows.length ? `<table style="width:100%;border-collapse:collapse;">${rowsToHtml(rows)}</table>` : '';
  const note = footnote
    ? `<p style="margin:20px 0 0;color:#64748B;font-size:13px;line-height:1.6;">${footnote}</p>`
    : '';
  return `<!doctype html><html><body style="margin:0;background:#F6F8FB;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:linear-gradient(135deg,${BRAND},${LEAF});border-radius:16px 16px 0 0;padding:28px 32px;">
        <p style="margin:0;color:#ffffff;font-size:18px;font-weight:800;">Autism &amp; Behavioral Health LLC</p>
      </div>
      <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:32px;border:1px solid #E2E8F0;border-top:0;">
        <h1 style="margin:0 0 12px;color:#1E293B;font-size:20px;">${heading}</h1>
        <p style="margin:0 0 20px;color:#64748B;font-size:14px;line-height:1.6;">${intro}</p>
        ${table}
        ${note}
      </div>
      <p style="text-align:center;color:#94A3B8;font-size:12px;margin:16px 0 0;">Sent by the Autism &amp; Behavioral Health website.</p>
    </div>
  </body></html>`;
};
