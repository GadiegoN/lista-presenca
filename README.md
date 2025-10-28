# 📋 Lista de Presença — Sistema de Controle de Frequência

Um sistema moderno e responsivo para **gerenciar presenças, jogadores e eventos**, desenvolvido em **Next.js 15**, com **Firebase Firestore** e exportação de relatórios em Excel.

---

## 🚀 Tecnologias Utilizadas

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS 4**
- **Firebase (Auth + Firestore)**
- **ExcelJS + FileSaver** para exportação
- **Framer Motion** para animações suaves
- **Lucide Icons** para ícones modernos
- **Date-fns** com suporte a locale `pt-BR`

---

## 🧠 Funcionalidades Principais

✅ **Autenticação Firebase**
Cada usuário possui seu próprio espaço — dados totalmente isolados por `userId`.

✅ **Gestão de Jogadores**
Adicione e visualize seus jogadores em uma lista simples e responsiva.

✅ **Gestão de Eventos**
Crie eventos com horário e data — automaticamente vinculados ao usuário autenticado.

✅ **Controle de Presenças**
Marque presença, falta ou justificativa de forma visual com ícones 🟢🟡🔴.

✅ **Exportação em Excel**
Gere relatórios semanais completos com formatação automática e emojis.

✅ **Dashboard Analítica**
Visualize gráficos de desempenho semanal e ranking de presença.

✅ **Layout Responsivo e Mobile-First**
O sistema é totalmente utilizável em **celulares, tablets e desktop**, com UI otimizada.

---

## 🧩 Estrutura do Projeto

```
src/
 ├─ app/
 │   ├─ login/
 │   ├─ register/
 │   ├─ dashboard/
 │   │   ├─ _components/
 │   │   └─ page.tsx
 │   ├─ jogadores/
 │   ├─ eventos/
 │   └─ presencas/
 │
 ├─ components/
 │   ├─ layout/
 │   │   ├─ sidebar.tsx
 │   │   ├─ header.tsx
 │   ├─ protected-route.tsx
 │
 ├─ context/
 │   └─ auth-context.tsx
 │
 ├─ lib/
 │   └─ firebase.ts
 │
 └─ styles/
     └─ globals.css
```

---

## ⚙️ Instalação e Execução

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/lista-presenca.git
cd lista-presenca
```

### 2️⃣ Instalar dependências

```bash
pnpm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env.local` com as credenciais do seu Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

---

### 4️⃣ Rodar o projeto

```bash
pnpm dev
```

Abra em [http://localhost:3000](http://localhost:3000)

---

## 🔒 Segurança (Firestore Rules)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{collection}/{docId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

Essas regras garantem que **cada usuário só acesse seus próprios dados.**

---

## 🧠 Conceitos-Chave

| Recurso      | Descrição                                                |
| ------------ | -------------------------------------------------------- |
| `Jogadores`  | Lista de atletas associados ao usuário                   |
| `Eventos`    | Treinos, jogos ou atividades                             |
| `Presenças`  | Registro de comparecimento dos jogadores                 |
| `Dashboard`  | Gráficos e ranking semanal                               |
| `Exportação` | Geração de planilha Excel com dados filtrados por semana |

---

## 📱 Layout Responsivo

| Dispositivo    | Visualização                         |
| -------------- | ------------------------------------ |
| 💻 **Desktop** | Interface completa com sidebar fixa  |
| 📱 **Mobile**  | Sidebar retrátil e layout empilhável |
| 📊 **Tablet**  | Tabelas e gráficos ajustados         |

---

## 🧑‍💻 Autor

**Gadiego Nogueira**
Desenvolvedor Full Stack • Next.js + Firebase • UX/UI • SaaS

📎 GitHub: [gadiegoN](https://github.com/gadiegoN)
📧 Contato: ngadiego@gmail.com

---

## 🧾 Licença

Este projeto está sob a licença **MIT**.
Sinta-se livre para usar, modificar e distribuir.

---

> 💡 _“Desenvolvido com foco em simplicidade, performance e acessibilidade — ideal para clubes, professores e gestores esportivos.”_
