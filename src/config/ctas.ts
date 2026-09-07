export const ctas = {
  calendlyUrl: '#agendar',                         // TODO: replace with real Calendly URL
  whatsappNumber: '000000000',                     // TODO: replace (country code + number, no + or spaces)
  whatsappDefaultMessage: 'Hola, me interesa conocer más sobre JEMA',
  whatsappMessages: {
    default: 'Hola, me interesa conocer más sobre JEMA',
    presenciaDigital: 'Hola, me interesa Presencia Digital',
    automatizacion: 'Hola, me interesa Automatización',
    softwareMedida: 'Hola, me interesa Software a Medida',
    contacto: 'Hola, quiero arrancar un proyecto con JEMA',
  },
  formEndpoint: '#contact',                        // TODO: future endpoint
  emailContact: 'hola@jema.com.ar',                // TODO: real email
  legalLinks: {
    privacidad: '#privacidad',                     // TODO: real legal pages
    terminos: '#terminos',                         // TODO: real legal pages
  },
} as const;

export function buildWhatsAppLink(message?: string): string {
  const text = message ?? ctas.whatsappDefaultMessage;
  return `https://wa.me/${ctas.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
