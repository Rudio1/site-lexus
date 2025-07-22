# Projeto Multi-Site

Este projeto é uma aplicação Next.js que suporta múltiplos domínios com configurações específicas para cada localidade.

## 🚀 Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- React Server Components

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Diretório principal da aplicação Next.js
│   ├── components/        # Componentes reutilizáveis
│   ├── about/            # Página Sobre
│   ├── contact/          # Página Contato
│   └── styles/           # Estilos globais
├── config/               # Configurações do projeto
│   └── sites.ts         # Configurações específicas por domínio
├── hooks/               # Hooks personalizados
│   └── useSiteConfig.ts # Hook para acessar configurações do site
└── middleware.ts        # Middleware para detecção de domínio
```

## 🔧 Configuração dos Sites

O projeto utiliza um sistema de configuração baseado em domínio. As configurações específicas de cada site estão definidas em `src/config/sites.ts`:

```typescript
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
```

## 🌐 Domínios Suportados

- https://example.com.br/
- https://example1.com.br/
- https://example2.com.br/

## 🛠️ Como Desenvolver

### 1. Desenvolvimento Local

Para rodar o projeto localmente:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

#### Testando Diferentes Domínios Localmente

Existem duas maneiras de testar diferentes domínios em ambiente de desenvolvimento:

##### Opção 1: Usando o arquivo hosts (Recomendado)

1. Abra o arquivo hosts do seu sistema operacional:
   - Windows: `C:\Windows\System32\drivers\etc\hosts`
   - Linux/Mac: `/etc/hosts`

2. Adicione as seguintes linhas:
   ```
   127.0.0.1 example1.com.br
   127.0.0.1 example2.com.br
   127.0.0.1 example3.com.br
   ```

3. Agora você pode acessar os diferentes sites usando:
   - http://example1.com.br:3000
   - http://example2.com.br:3000
   - http://example3.com.br:3000

##### Opção 2: Usando Headers (Alternativa)

Se preferir não modificar o arquivo hosts, você pode usar uma extensão do navegador como "ModHeader" para modificar o header `host`:

1. Instale a extensão "ModHeader" no seu navegador
2. Configure uma nova regra:
   - Header name: `host`
   - Header value: `example1.com.br` (ou qualquer outro domínio que queira testar)

3. Acesse http://localhost:3000

#### Comportamento em Desenvolvimento

- O middleware permite qualquer hostname
- Se não houver configuração específica para o hostname, será usado o site de Vitória como padrão
- Não há redirecionamentos automáticos
- Você pode testar diferentes configurações usando qualquer um dos métodos acima

### 2. Acessando Configurações do Site

Para acessar as configurações específicas do site em qualquer componente:

```typescript
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default async function SeuComponente() {
  const siteConfig = await useSiteConfig();
  
  return (
    <div>
      <h1>{siteConfig.name}</h1>
      <img src={siteConfig.logo} alt="Logo" />
    </div>
  );
}
```

### 3. Adicionando Novos Sites

Para adicionar um novo site, adicione suas configurações em `src/config/sites.ts`:

```typescript
export const sites: Record<string, SiteConfig> = {
  'novosite.com.br': {
    name: 'Novo Site',
    logo: '/images/logo-novo.png',
    // ... outras configurações
  }
};
```

### 4. Imagens

- Todas as imagens devem ser colocadas na pasta `public/images/`
- Use o componente `Image` do Next.js para otimização:

```typescript
import Image from 'next/image';

<Image
  src={siteConfig.logo}
  alt={siteConfig.name}
  width={150}
  height={50}
  className="h-auto"
/>
```

### 5. Componentes

- Use React Server Components por padrão (não use 'use client' a menos que necessário)
- Mantenha os componentes em `src/app/components/`
- Siga o padrão de nomenclatura PascalCase para componentes

### 6. Estilos

- Use Tailwind CSS para estilização
- Evite CSS inline
- Mantenha classes organizadas e reutilizáveis

## 🔒 Segurança

- Nunca exponha informações sensíveis nos arquivos de configuração
- Use variáveis de ambiente para dados sensíveis
- Valide sempre os inputs do usuário

## 🚀 Deploy

1. Configure os domínios no seu provedor de hospedagem
2. Configure as variáveis de ambiente necessárias
3. Faça o build do projeto: `npm run build`
4. Inicie o servidor: `npm start`

## 📝 Convenções de Código

- Use TypeScript para todos os arquivos
- Siga o padrão de nomenclatura camelCase para funções e variáveis
- Use PascalCase para componentes e tipos
- Mantenha os arquivos organizados e com responsabilidade única
- Documente funções e componentes complexos

## 🔍 SEO

- Cada site mantém sua própria identidade
- Use metadados específicos por página
- Mantenha URLs amigáveis
- Otimize imagens e conteúdo
