# GitHub Upload Guide

## 推奨 flow

```bash
git init
git branch -M main
git add .
git commit -m "Initial LiteRaceSegNet V13 Japanese release"
git remote add origin https://github.com/jcicaaa3-cloud/LiteRaceSegNet-V13-Portal.git
git push -u origin main
```

## Before push

- private data が含まれていないことを確認する。
- `.env`、API keys、cloud credentials、`.pem` files が含まれていないことを確認する。
- 図版が日本語 label で統一されていることを確認する。
- `README.md` と `index.html` が日本語版を指していることを確認する。
