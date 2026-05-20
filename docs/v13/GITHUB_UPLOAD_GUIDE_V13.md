# GitHub Upload Guide for V13

```bash
git init
git add .
git commit -m "Release LiteRaceSegNet V13 evidence portal"
git branch -M main
git remote add origin https://github.com/jcicaaa3-cloud/LiteRaceSegNet-V13-Portal.git
git push -u origin main
```

Then enable GitHub Pages:

```text
Settings -> Pages -> Deploy from a branch -> main -> /root
```

Check before upload:

```bash
find . -name "*.pem" -o -name ".env" -o -name "*.pth" -o -name "*.pt" -o -name "*.ckpt"
```

These files stay outside the public release.
