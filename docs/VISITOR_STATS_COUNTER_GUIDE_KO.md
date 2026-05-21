# 방문 통계 카운터 안내

이 패키지는 GitHub Pages에서 바로 동작하도록 `assets/visitor-stats.js`를 추가했습니다.

## 집계 항목

- 사이트 누적 방문
- 같은 브라우저 기준 방문자 수 보정
- 현재 페이지 방문
- GitHub 저장소 이동 클릭

## 저장소 URL

모든 사이트 내 GitHub 링크는 아래 저장소로 맞췄습니다.

```text
https://github.com/jcicaaa3-cloud/LiteRaceSegNet-V13-Portal-Clean
```

## 동작 방식

- 먼저 브라우저 localStorage 기준 임시 수치를 즉시 표시합니다. 그래서 `...` 상태로 멈추지 않습니다.
- 이후 CounterAPI v1 public counter에 연결되면 실시간 누적 수치로 자동 교체됩니다.
- 외부 카운터가 네트워크, CORS, 회사/학교망 정책 등으로 막히면 패널은 주황색 상태로 남고 브라우저 기준 수치를 표시합니다.
- GitHub 저장소 자체의 공식 views/clones는 GitHub Repository Insights → Traffic에서 확인합니다. 공개 페이지에서는 사이트에서 GitHub로 이동한 클릭 수를 함께 집계합니다.

## 수정 파일

- `assets/visitor-stats.js`
- `index.html`
- `pages/*.html`
- `README.md`
- `README_JA.md`
