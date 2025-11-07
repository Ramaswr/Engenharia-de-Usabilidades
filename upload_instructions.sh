#!/usr/bin/env bash
# Script de instruções automatizáveis — NÃO contém credenciais.
# Execute estas linhas no seu terminal local (faça login quando solicitado).

set -euo pipefail
PROJECT_DIR="$(pwd)"
REPO="Ramaswr/Engenharia-de-usabilidade"

echo "1) Inicializando git (se necessário)"
if [ ! -d ".git" ]; then
  git init
  git add .
  git commit -m "Prepare optimized bundle for distribution"
else
  echo "Já existe .git — atualizando commit"
  git add .
  git commit -m "Update optimized bundle" || true
fi

echo "\n2) Autentique no GitHub CLI (se não estiver autenticado)"
echo "Run: gh auth login"

echo "\n3) Criando repositório remoto (se ainda não existir)"
# cria o repo e faz push (confirm will be asked by gh if needed)
gh repo create ${REPO} --public --source=. --remote=origin --push || true

echo "\n4) Criar Release com o ZIP (opcional)"
if [ -f "projeto-usabilidade-optimized.zip" ]; then
  gh release create v1.0 projeto-usabilidade-optimized.zip --title "v1.0" --notes "Pacote para Teams - distribuição rápida" || true
  echo "Release criada (se permissões permitirem)."
else
  echo "ZIP não encontrado. Rode o script de empacotamento primeiro."
fi

echo "\nPronto. Se quiser que eu gere automaticamente PRs/CI para GitHub Pages, me avise."