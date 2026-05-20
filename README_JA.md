# LiteRaceSegNet-V13 Research Portal

LiteRaceSegNet-V13 は、AWS 実験結果を反映した GitHub Pages 用の研究ポートフォリオです。軽量 segmentation model の構造差、閾値、境界、case split を evidence として整理し、静的サイトで読みやすくまとめています。

## V13 の主な更新

- `final_evidence/` に AWS 実験結果を統合。
- HTML の placeholder 表現を外し、測定済み結果を Evidence ページに反映。
- `docs/assets/v13/` に service card / overlay / boundary sheet を追加。
- QA Guide の会話を増やし、ablation、threshold、boundary-local metric、case split、limitation まで説明。
- 静的ポートフォリオとして公開し、raw dataset、checkpoint、認証情報は配布物から分離。

## 主要結果

| 項目 | 結果 | 扱い |
|---|---:|---|
| Full model mIoU | 0.8072 | AWS validation protocol |
| Full model damage IoU | 0.7113 | AWS validation protocol |
| Parameters | 0.125M | model profile |
| Latency | 3.097 ms/image | CUDA profile |
| Ablation variants | 7 | same-protocol comparison |
| Boundary-local aggregate IoU | 0.3212 | 32×32 / 64×64 patch |
| Visual evaluation subset | 10 images | held-out preview/evaluation subset |

## 結果パッケージの読み方

V13 は、記録された AWS validation protocol に基づく研究記録です。数値表では構造差と閾値差を読み、10-image visual subset では mask、overlay、boundary の見え方を確認します。Boundary-local recall も改善余地として残しているため、単なるスコア表ではなく、次の改善点まで追える構成です。

## サイト構成

- `index.html` — V13 overview と読み順。
- `pages/evidence.html` — 7-variant ablation、threshold、boundary-local metrics、case split。
- `pages/demo.html` — visual sheets と selected service cards。
- `pages/qa-guide.html` — 研究レビュー用の対話形式ガイド。
- `final_evidence/` — AWS run で生成した Markdown / CSV / PNG evidence。
- `docs/assets/v13/` — GitHub Pages 用の visual assets。

## GitHub Pages

root deployment を使います。

```text
Settings -> Pages -> Deploy from a branch -> main -> /root
```

## 公開範囲

含めるもの: source code、static pages、public diagrams、summary tables、selected result visualizations、evidence CSV/Markdown files。

配布物から分離するもの: raw private datasets、checkpoints、pretrained weights、API keys、`.pem` files、`.env`、cloud credentials、personal environment files。

## モデルと baseline の位置づけ

LiteRaceSegNet-V13 は、`seg/core/lightweight_race.py` に実装した custom LiteIR-style lightweight CNN を中心に構成しています。LiteIRBlock は MobileNetV2/V3-style inverted-residual の軽量化アイデアを背景にしつつ、detail/context branch、LiteASPP、boundary-guided fusion、auxiliary output を道路損傷 segmentation 向けに組み合わせています。

SegFormer-B3 は Transformer comparison baseline として別経路に置いています。関連 script は `seg/transformer_b3/` と `02_SETUP_SEGFORMER_B3_HF.bat` にあり、pretrained weight、fine-tuned checkpoint、Hugging Face cache、private dataset、credentials は public zip とは分けて扱います。

短い説明:

> LiteRaceSegNet は custom LiteIR-style lightweight CNN segmentation model です。SegFormer-B3 は比較用の別 baseline です。

Third-party note: SegFormer の NVLabs reference materials は research/evaluation reference として扱い、Hugging Face `nvidia/segformer-b3-finetuned-ade-512-512` は表示されている `other` license の扱いを確認対象にします。TorchVision は BSD-3-Clause、Hugging Face Transformers は Apache 2.0 として整理しています。
