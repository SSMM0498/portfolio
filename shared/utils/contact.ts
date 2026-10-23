// Longest value accepted for each contact form field, enforced by the form and by /api/contact.
export const CONTACT_MAX_LENGTH = {
  name: 100,
  email: 254,
  phoneNumber: 30,
  subject: 150,
  message: 5000,
}

export type ContactField = keyof typeof CONTACT_MAX_LENGTH
