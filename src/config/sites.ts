export type SiteConfig = {
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
};

export const sites: Record<string, SiteConfig> = {
  'lexusvitoria.com.br': {
    name: 'Lexus Vitória',
    logo: '/image/logo_vitoria_branco.svg',
    address: 'Endereço Vitória',
    phone: '(27) 3333-3333',
    email: 'contato@lexusvitoria.com.br',
    socialMedia: {
      instagram: '@lexusvitoria',
      facebook: 'lexusvitoria',
      whatsapp: '27999999999'
    }
  },
  'lexusbh.com.br': {
    name: 'Lexus Belo Horizonte',
    logo: '/image/logo_bh.png',
    address: 'Endereço Belo Horizonte',
    phone: '(31) 3333-3333',
    email: 'contato@lexusbh.com.br',
    socialMedia: {
      instagram: '@lexusbh',
      facebook: 'lexusbh',
      whatsapp: '31999999999'
    }
  },
  'lexusbrasilia.com.br': {
    name: 'Lexus Brasília',
    logo: '/image/logo_brasilia.png',
    address: 'Endereço Brasília',
    phone: '(61) 3333-3333',
    email: 'contato@lexusbrasilia.com.br',
    socialMedia: {
      instagram: '@lexusbrasilia',
      facebook: 'lexusbrasilia',
      whatsapp: '61999999999'
    }
  }
}; 