# Visitor statistics counter guide

이 패키지에는 정적 GitHub Pages에서 동작하는 간단한 방문 통계 기능이 추가되어 있습니다.

## 사이트에서 집계하는 항목

- 사이트 누적 방문 수: 모든 HTML 페이지 로드 횟수
- 방문자 수: 같은 브라우저에서는 한 번만 집계하는 localStorage 기반 rough unique count
- 현재 페이지 방문 수: 현재 HTML 페이지별 로드 횟수
- GitHub 이동 수: 사이트 안에서 GitHub 링크를 클릭한 횟수

카운터는 `assets/visitor-stats.js`에서 관리하며, CounterAPI v1 public endpoint를 사용합니다. 외부 API가 차단된 환경에서는 숫자 대신 대기 상태가 보일 수 있습니다.

## GitHub 저장소 카운트

`README.md`와 `README_JA.md` 상단에는 GitHub 저장소 페이지에서 보이는 조회수 배지가 추가되어 있습니다. GitHub의 공식 repository views/clones 최종 통계는 저장소의 `Insights -> Traffic`에서 확인합니다.
