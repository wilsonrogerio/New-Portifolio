# 🛡️ Validação de Formulários - Segurança

## Por que Validação é Importante?

A validação é a **primeira linha de defesa** contra:
- XSS (Cross-Site Scripting)
- SQL Injection (no backend)
- Dados malformados
- Ataques de força bruta

---

## Validação no Angular

### 1. **Validadores Built-in**

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      // Email: obrigatório + formato válido
      email: ['', [Validators.required, Validators.email]],
      
      // Nome: obrigatório + 3-50 caracteres
      name: ['', [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      
      // Mensagem: obrigatório + 10-1000 caracteres
      message: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]],
      
      // Telefone: formato válido
      phone: ['', [
        Validators.pattern(/^(\+55|0)?(\d{2})?(\d{4,5})-?(\d{4})$/)
      ]]
    });
  }

  get email() { return this.contactForm.get('email'); }
  get name() { return this.contactForm.get('name'); }
  get message() { return this.contactForm.get('message'); }
  get phone() { return this.contactForm.get('phone'); }

  submit(): void {
    // Valida ANTES de enviar
    if (this.contactForm.invalid) {
      console.warn('Formulário inválido');
      return;
    }

    const formData = this.contactForm.value;
    // Enviar dados para API
  }
}
```

### 2. **Validadores Customizados**

```typescript
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Validador customizado: bloqueia palavras banidas
export function bannedWordsValidator(words: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const text = control.value.toLowerCase();
    for (const word of words) {
      if (text.includes(word.toLowerCase())) {
        return { bannedWord: { word } };
      }
    }
    return null;
  };
}

// Uso
this.contactForm = this.fb.group({
  message: ['', [
    Validators.required,
    bannedWordsValidator(['spam', 'curse'])
  ]]
});
```

### 3. **Sanitização de Entrada**

```typescript
import { DomSanitizer } from '@angular/platform-browser';

export class SafeDisplayComponent {
  constructor(private sanitizer: DomSanitizer) {}

  // Remove caracteres perigosos
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')  // Remove < e >
      .replace(/javascript:/gi, '')  // Remove javascript:
      .trim();  // Remove espaços
  }

  // Sanitiza HTML (se realmente precisar de HTML)
  getSafeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
```

---

## Template HTML com Validação

```html
<form [formGroup]="contactForm" (ngSubmit)="submit()">
  
  <!-- Email -->
  <div class="form-group">
    <label for="email">Email:</label>
    <input 
      id="email"
      type="email"
      formControlName="email"
      placeholder="seu@email.com"
      aria-invalid="email.invalid && email.touched"
    >
    
    <!-- Mensagens de erro -->
    <div *ngIf="email?.invalid && email?.touched" class="error-message">
      <p *ngIf="email?.hasError('required')">Email é obrigatório</p>
      <p *ngIf="email?.hasError('email')">Email inválido</p>
    </div>
  </div>

  <!-- Nome -->
  <div class="form-group">
    <label for="name">Nome:</label>
    <input 
      id="name"
      type="text"
      formControlName="name"
      placeholder="Seu Nome"
      maxlength="50"
      aria-invalid="name.invalid && name.touched"
    >
    
    <div *ngIf="name?.invalid && name?.touched" class="error-message">
      <p *ngIf="name?.hasError('required')">Nome é obrigatório</p>
      <p *ngIf="name?.hasError('minlength')">Mínimo 3 caracteres</p>
      <p *ngIf="name?.hasError('maxlength')">Máximo 50 caracteres</p>
    </div>
  </div>

  <!-- Mensagem -->
  <div class="form-group">
    <label for="message">Mensagem:</label>
    <textarea 
      id="message"
      formControlName="message"
      placeholder="Sua mensagem"
      maxlength="1000"
      rows="5"
      aria-invalid="message.invalid && message.touched"
    ></textarea>
    
    <p class="char-count">{{ message?.value?.length || 0 }}/1000</p>
    
    <div *ngIf="message?.invalid && message?.touched" class="error-message">
      <p *ngIf="message?.hasError('required')">Mensagem é obrigatória</p>
      <p *ngIf="message?.hasError('minlength')">Mínimo 10 caracteres</p>
    </div>
  </div>

  <!-- Botão (desabilitado até form válido) -->
  <button 
    type="submit"
    [disabled]="contactForm.invalid"
    class="btn btn-primary"
  >
    Enviar Mensagem
  </button>
</form>
```

---

## Estilos SCSS

```scss
.form-group {
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s;
    
    &:focus {
      outline: none;
      border-color: #2b6cb0;
      box-shadow: 0 0 0 3px rgba(43, 108, 176, 0.1);
    }
    
    // Campo inválido
    &[aria-invalid="true"] {
      border-color: #dc3545;
      background-color: rgba(220, 53, 69, 0.05);
    }
    
    // Campo desabilitado
    &:disabled {
      background-color: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }
  }
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  
  p {
    margin: 0.25rem 0;
    display: flex;
    align-items: center;
    
    &:before {
      content: "⚠ ";
      margin-right: 0.5rem;
    }
  }
}

.char-count {
  font-size: 0.875rem;
  color: #999;
  margin-top: 0.25rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &.btn-primary {
    background-color: #2b6cb0;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #1e4d7b;
      transform: translateY(-2px);
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}
```

---

## Best Practices

### ✅ Faça

- Valide **SEMPRE** no cliente
- Valide **SEMPRE** no servidor (dupla validação)
- Use `type="email"`, `type="tel"`, etc
- Use `maxlength` no HTML
- Sanitize entrada de usuário
- Mostre erros claros ao usuário
- Desabilite botão até form válido

### ❌ Não Faça

- Confie apenas em validação client-side
- Use `innerHTML` com dados de formulário
- Armazene senhas em localStorage
- Envie dados sem HTTPS
- Ignore erros de validação
- Use `eval()` nunca!

---

## Validação Backend (Exemplo Node.js)

```typescript
// routes/contact.ts
import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/contact', 
  // Validação
  body('email').isEmail().normalizeEmail(),
  body('name').isLength({ min: 3, max: 50 }).trim().escape(),
  body('message').isLength({ min: 10, max: 1000 }).trim().escape(),
  body('phone').optional().matches(/^[\d\s\-\+\(\)]+$/),
  
  // Handler
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, name, message } = req.body;
    
    // Processa dados validados
    // ... enviar email, salvar DB, etc
    
    res.json({ success: true, message: 'Mensagem recebida!' });
  }
);

export default router;
```

---

## Checklist de Validação

- [ ] Todos os campos possuem validadores
- [ ] Mensagens de erro são claras
- [ ] Botão submit fica desabilitado até form válido
- [ ] `maxlength` implementado no HTML
- [ ] Dados são sanitizados antes de usar
- [ ] Backend também valida dados
- [ ] Sem `innerHTML` com dados de forms
- [ ] Testes de validação escritos
- [ ] Testes com entrada maliciosa feitos

---

## Referências

- [Angular Form Validation](https://angular.io/guide/form-validation)
- [OWASP Input Validation](https://owasp.org/www-community/attacks/Improper_Input_Validation)
- [DOMSanitizer API](https://angular.io/api/platform-browser/DomSanitizer)
- [Express Validator](https://express-validator.github.io/)
