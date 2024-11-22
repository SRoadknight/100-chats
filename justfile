default:
  just --list

run-backend *args:
  cd backend && poetry run uvicorn src.main:app --reload {{args}}

run-frontend:
  cd frontend && npm run dev

mm *args:
  cd backend && poetry run alembic revision --autogenerate -m "{{args}}"

migrate:
  cd backend && poetry run alembic upgrade head

migrate-offline *args:
  cd frontend && generated_file=$(npx supabase migration new "{{args}}" | awk '{print $NF}') \
  && cd ../backend && poetry run alembic upgrade head --sql > "../frontend/${generated_file}"

reset *args:
  cd frontend && npx supabase db reset {{args}}

diff *args:
  cd frontend && npx supabase db diff --local -f "{{args}}"

downgrade *args:
  cd backend && poetry run alembic downgrade {{args}}

ruff *args:
  cd backend && poetry run ruff check {{args}} src

lint:
  cd backend && poetry run ruff format src
  just ruff --fix
  cd backend && poetry run ruff format alembic