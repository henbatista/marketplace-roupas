<h1 align="center">  Marketplace de Roupas em React.js </h1>
<h3 align="center"> Este é um projeto de interface em React.js, CSS e Bootstrap para criar um marketplace</h3>
## Recursos
Listagem de produtos com nome, preço e imagem.
Modal com detalhes do produto ao clicar em um item.
Navbar com opções de navegação.
Filtro por categoria de produto.
Design inspirado na imagem da Nike.

## Header

<img width="907" alt="image" src="https://github.com/henbatista/marketplace-roupas/assets/85231417/46d5e603-c907-4555-8e10-cba22f110fc7">

`Cadastro de novo item`

## body

<img width="894" alt="image" src="https://github.com/henbatista/marketplace-roupas/assets/85231417/adff9169-f3d4-47f3-b9c8-50a41c0744ef">

## Filter

<img width="864" alt="image" src="https://github.com/henbatista/marketplace-roupas/assets/85231417/e1519d69-b44a-49fa-a606-ad78811350db">

## Modal

<img width="880" alt="image" src="https://github.com/henbatista/marketplace-roupas/assets/85231417/e5be48ac-cce6-4c8a-abe3-1b6d63d80280">

## Novo item

<img width="421" alt="image" src="https://github.com/henbatista/marketplace-roupas/assets/85231417/51e25f4c-4dd3-4bd1-955e-0b587f65b05f">

## Instruções de Uso

Clone este repositório:

```bash
gh repo clone henbatista/marketplace-roupas
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

Abra o navegador e acesse http://localhost:3000 para visualizar a aplicação.

## Bibliotecas Utilizadas

React.js<br>
Next.js<br>
Prisma<br>
Supabase<br>
Tailwindcss<br>
Dotenv<br>
Bootstrap<br>
Nanoid<br>
Base64<br>
Axios<br>

## Bibliotecas Utilizadas

src/<br>
|-- components/<br>
|------ |-- Logo/<br>
|------------ |-- index.tsx<br>
|------ |-- Resource/<br>
|------------ |-- index.tsx<br>
|------ |-- ResourceGrid/<br>
|------------ |-- index.tsx<br>
|-- lib/<br>
|--- |-- prisma.ts<br>
|-- pages/<br>
|---- |-- api/<br>
|--------- |---resources/<br>
|------------------ |--- [id].tsx<br>
|------------------ |--- index.tsx<br>
|---- |--- resources/<br>
|-------------- |--- [id]/<br>
|------------------ |--- update.tsx<br>
|------------------ |--- index.tsx<br>
|-------------- |--- create.tsx<br>
|---- |--- app.tsx<br>
|---- |--- index.tsxv
|-- prisma/<br>
|---- |-- migration/<br>
|---- |-- schema.prisma<br>
|-- public/<br>
|------ |-- logo.pmg<br>
|-- sections/<br>
|---- |-- Footer/<br>
|--------- |---index.tsx/<br>
|---- |-- Header/<br>
|--------- |---index.tsx/<br>
|---- |-- Layout/<br>
|--------- |---index.tsx/<br>
|-- style/<br>
|----- |-- globals.css<br>

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
