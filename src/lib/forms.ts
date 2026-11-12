const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function formsEnabled() {
  const e = process.env;
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let originValid = false;
  try { const url = new URL(e.SITE_URL ?? ''); originValid = url.protocol === 'https:' && !url.username && !url.password && url.pathname === '/' && !url.search && !url.hash; } catch { /* Invalid configuration remains disabled. */ }
  const recipients = (e.MAILJET_NOTIFICATION_TO ?? '').split(',').map((item) => item.trim());
  return e.FORMS_ENABLED === 'true' && e.FORMS_ABUSE_PROTECTION_CONFIRMED === 'true' && originValid && email.test(e.MAILJET_FROM_EMAIL ?? '') && recipients.length > 0 && recipients.every((item) => email.test(item)) && /^\d+$/.test(e.HUBSPOT_PORTAL_ID ?? '') && uuid.test(e.HUBSPOT_CONTACT_FORM_ID ?? '') && uuid.test(e.HUBSPOT_VENDOR_FORM_ID ?? '') && !!(e.MAILJET_API_KEY && e.MAILJET_API_SECRET && e.MAILJET_FROM_EMAIL && e.MAILJET_NOTIFICATION_TO && e.SITE_URL);
}
export const services = ['Security and surveillance', 'Infrastructure and data systems', 'Networks and communication', 'Other enquiry'];
export const industries: Record<string, string> = { Supplier: 'supplier', Contractor: 'Contractor', 'Service provider': 'Service-Provider', Manufacturer: 'Manufacturer', Distributor: 'Distributor', Other: 'Other' };
export const categories: Record<string, string> = { 'CCTV and surveillance systems': 'CCTV_Surveillance Systems', 'Access control systems': 'Access_Control_Systems', 'Fire detection and alarms': 'Fire Detection_Alarms', 'Networking and IT infrastructure': 'Networking_Infrastructure', 'ELV systems': 'ELV_Systems', 'Installation services': 'Installation_Services', 'Maintenance services': 'Maintenance_Services', 'Hardware and equipment': 'Hardware_Equipment', 'Software solutions': 'Software_Solutions', Other: 'Other' };
