Engenharia de Usabilidade — pacote para distribuição

Este diretório contém uma versão otimizada do projeto para distribuição (ZIP e diretório `dist/`).

Arquivos principais
- index.html — página principal do app
- style.min.css — CSS minificado (referenciado pelo dist/index.html)
- script.js — lógica do app (mantida legível para segurança)
- img/congresso.jpg — imagem usada pela página
- projeto-usabilidade-optimized.zip — artefato pronto para envio

O que eu preparei automaticamente
1) `style.min.css` — CSS minificado
2) `dist/` (gerado automaticamente) — contendo index.html atualizado para usar `style.min.css`, `script.js` e `img/congresso.jpg` (imagem otimizada se ferramenta disponível)
3) `projeto-usabilidade-optimized.zip` — ZIP pronto para compartilhar
4) `upload_instructions.sh` — script com comandos seguros para criar o repositório GitHub, habilitar Pages e criar uma Release (você precisa autenticar localmente)

Importante — segurança e credenciais
- Eu não faço login nas suas contas por você. Não compartilhe senhas aqui.
- Para publicar no GitHub, use o `gh auth login` (GitHub CLI) ou crie um Personal Access Token (PAT) e siga as instruções abaixo.
- Para enviar ao iCloud, use o site https://www.icloud.com (arrastar o ZIP para o iCloud Drive).

Passos recomendados (rápido)
1) Abra um terminal no diretório do projeto:

   cd "/home/jerr/Desktop/Engenharia de Usabilidade"

2) Inicializar git local (se ainda não):

   git init
   git add .
   git commit -m "Prepare optimized bundle for distribution"

3) Criar repositório remoto (via gh):

   gh auth login     # autentique via navegador
   gh repo create Ramaswr/Engenharia-de-usabilidade --public --source=. --remote=origin --push

4) Habilitar GitHub Pages (Settings → Pages) apontando para branch `main` (root).

5) Criar Release com ZIP (opcional):

   gh release create v1.0 projeto-usabilidade-optimized.zip --title "v1.0" --notes "Pacote para Teams - distribuição rápida"

Se quiser que eu gere um commit específico, tags, ou automatize a criação de um release draft (PR), diga e eu preparo os comandos ou os arquivos de CI.
