# 🔒 Guia de Segurança - Portfólio Wilson

## Análise Atual do Projeto

Seu projeto tem uma **boa base de segurança**, mas existem melhorias importantes a implementar.

---

## ✅ O Que Você JÁ Está Fazendo Bem

### 1. **TypeScript Strict Mode** ✓
```json
{
  "strict": true,
  "noImplicitAny": true,
  "noImplicitOverride": true,
  "noPropertyAccessFromIndexSignature": true
}
```
- Reduz bugs e vulnerabilidades em tempo de compilação
- Força tipagem forte

### 2. **Angular Security** ✓
- Angular 20 (versão recente) com patches de segurança
- XSS Protection automática (sanitização de templates)
- CSRF token handling automático

### 3. **.gitignore Configurado** ✓
- `node_modules` ignorado (não envia dependências)
- `.vscode` parcialmente protegido
- Build outputs ignorados (`/dist`, `/out-tsc`)

### 4. **Build Production** ✓
```json
"outputHashing": "all"  // Hashes em nomes de arquivos
```

---

## ⚠️ Segurança: Problemas & Soluções

### 1. **❌ Arquivo .env Não Configurado**

**Risco**: Credenciais e chaves API em código aberto

**Solução**:

```bash
# 1. Crie arquivo .env.example (versionar no Git)
```

**Arquivo: `.env.example`**
```env
# APIs e Chaves
API_KEY=your_api_key_here
API_URL=https://api.example.com
FIREBASE_API_KEY=your_firebase_key

# Não incluir valores reais aqui!
```

**Arquivo: `.env` (NÃO VERSIONAR)**
```env
API_KEY=sk-abc123xyz789
API_URL=https://api.myserver.com
FIREBASE_API_KEY=AIzaSyC...
```

**Atualize `.gitignore`**:
```ignore
# Environment variables
.env
.env.local
.env.*.local
```

### 2. **❌ Sem Proteção Contra Injeção HTML/XSS**

**Risco**: Dados de usuário podem ser XSS injected

**Verificação**: Procure por `innerHTML` ou `[innerHTML]` nos templates

**Solução - Use data binding seguro**:

```typescript
// ❌ PERIGOSO
<div [innerHTML]="userData.bio"></div>

// ✅ SEGURO
<div>{{ userData.bio }}</div>
```

Se precisar de HTML, use `DomSanitizer`:

```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

getSafeHtml(html: string) {
  return this.sanitizer.sanitize(1, html) || '';
}
```

### 3. **❌ Sem Rate Limiting (API)**

**Risco**: Brute force, DDoS

**Solução** (Backend):
```typescript
// Se tiver API, use rate limiting
// Exemplo com Express:
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100 // 100 req/IP
});

app.use('/api/', limiter);
```

### 4. **❌ Sem Content Security Policy (CSP)**

**Risco**: Injections, XSS attacks

**Solução - Adicione ao `index.html`**:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Wilson Portfólio</title>
  
  <!-- CSP Header -->
  <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self'; 
                 script-src 'self' 'unsafe-inline'; 
                 style-src 'self' 'unsafe-inline'; 
                 img-src 'self' data: https:;
                 font-src 'self' data:;">
  
  <!-- Outras proteções -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

### 5. **❌ Sem HTTPS Obrigatório**

**Risco**: Man-in-the-middle attacks, credential theft

**Solução - Configure no servidor**:

```typescript
// Se usar Node/Express
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  }
  next();
});
```

**Ou no nginx**:
```nginx
server {
  listen 80;
  server_name example.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  # ... certificado SSL aqui
}
```

### 6. **❌ Sem ESLint Security Plugin**

**Risco**: Código inseguro não é detectado

**Solução**:

```bash
npm install --save-dev eslint eslint-plugin-security
```

**Arquivo: `.eslintrc.json`**
```json
{
  "extends": ["plugin:security/recommended"],
  "rules": {
    "security/detect-object-injection": "warn",
    "security/detect-eval-with-expression": "error",
    "security/detect-non-literal-regexp": "warn"
  }
}
```

### 7. **❌ Sem Validação de Input**

**Risco**: Dados malformados chegam ao servidor

**Solução - Implemente validação**:

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.pattern(/^[0-9\-\+\s\(\)]*$/)]]
    });
  }

  submit() {
    if (this.contactForm.valid) {
      // Apenas processa dados válidos
      const data = this.contactForm.value;
    }
  }
}
```

### 8. **❌ Sem Headers de Segurança**

**Risco**: Exposição de tecnologias, clicks jacking

**Solução - Configure no servidor**:

```typescript
// Express.js com helmet
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
  },
}));
```

---

## 🔐 Checklist de Segurança

### Development
- [ ] `.env` configurado (não versionado)
- [ ] `.env.example` criado (versionado)
- [ ] ESLint + security plugin instalado
- [ ] Sem `innerHTML` com dados dinâmicos
- [ ] Validação de forms implementada
- [ ] TypeScript strict mode ✓ (já tem)

### Pre-Deploy
- [ ] `npm audit` sem vulnerabilidades críticas
- [ ] `ng build --prod` compilado
- [ ] Source maps removidos em produção
- [ ] API keys não em código
- [ ] CORS configurado corretamente

### Deployment
- [ ] HTTPS obrigatório
- [ ] CSP headers configurados
- [ ] Rate limiting ativo
- [ ] Helmet/security headers implementados
- [ ] Logging & monitoring ativo
- [ ] Backups automáticos

---

## 🚀 Passos Imediatos (Prioridade Alta)

### 1. Criar .env
```bash
# Crie na raiz do projeto
touch .env .env.example
```

### 2. Adicionar ao .gitignore
```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### 3. Instalar ESLint Security
```bash
npm install --save-dev eslint eslint-plugin-security
```

### 4. Atualizar index.html com CSP
(Ver exemplo acima)

### 5. Rodar audit de segurança
```bash
npm audit
npm audit fix
```

---

## 📚 Referências

- [Angular Security Guide](https://angular.io/guide/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Helmet.js](https://helmetjs.github.io/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

## 💡 Dica Extra: Automatize Segurança

**GitHub Actions** (se usar GitHub):
```yaml
name: Security
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm audit
      - run: npm run lint
```

---

## Perguntas de Segurança Frequentes

**P: Preciso de autenticação?**  
R: Se tiver backend ou APIs, sim. Use JWT com refresh tokens.

**P: Como proteger dados sensíveis?**  
R: Use HTTPS, criptografe em transit, nunca armazene localmente.

**P: Preciso de 2FA?**  
R: Para admin/backend sim. Frontend é cliente, não precisa.

**P: Como fazer deploy seguro?**  
R: Use CI/CD (GitHub Actions, GitLab CI), secrets manager, HTTPS.
