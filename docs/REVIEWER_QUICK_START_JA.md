# Reviewer Quick Start

## Smoke check

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python scripts/smoke_check_literace.py
```

Expected output:

```text
LiteRaceSegNet smoke check OK
trainable_params=124,509
outputs={'out': (1, 2, 64, 64), 'aux': (1, 2, 64, 64), 'boundary': (1, 1, 64, 64)}
```

## What to inspect

- `seg/core/lightweight_race.py`
- `README.md`
- `MODEL_CARD.md`
- `docs/assets/`
- `evidence_templates/`
