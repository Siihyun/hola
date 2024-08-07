const languageMap = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  React: 'react',
  Vue: 'vue',
  Svelte: 'svelte',
  Nextjs: 'nextjs',
  Nodejs: 'nodejs',
  Java: 'java',
  Spring: 'spring',
  Go: 'go',
  Nestjs: 'nestjs',
  Kotlin: 'kotlin',
  Express: 'express',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Python: 'python',
  Django: 'django',
  php: 'php',
  GraphQL: 'graphql',
  Firebase: 'firebase',
  Flutter: 'flutter',
  Swift: 'swift',
  ReactNative: 'reactnative',
  Unity: 'unity',
  AWS: 'aws',
  Kubernetes: 'kubernetes',
  Git: 'git',
  Figma: 'figma',
  Docker: 'docker',
  Zeplin: 'zeplin',
  Jest: 'jest',
  C: 'c',
};

const languageList = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'nodejs', label: 'Nodejs' },
  { value: 'spring', label: 'Spring' },
  { value: 'java', label: 'Java' },
  { value: 'nextjs', label: 'Nextjs' },
  { value: 'nestjs', label: 'Nestjs' },
  { value: 'express', label: 'Express' },
  { value: 'go', label: 'Go' },
  { value: 'c', label: 'C' },
  { value: 'python', label: 'Python' },
  { value: 'django', label: 'Django' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'php', label: 'php' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'reactnative', label: 'ReactNative' },
  { value: 'unity', label: 'Unity' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'aws', label: 'AWS' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'docker', label: 'Docker' },
  { value: 'git', label: 'Git' },
  { value: 'figma', label: 'Figma' },
  { value: 'zeplin', label: 'Zeplin' },
];

const studyOrProjectOption = [
  { value: '1', label: '프로젝트' },
  { value: '2', label: '스터디' },
];

const onlineOrOfflineOption = [
  { value: 'ALL', label: '전체' },
  { value: 'on', label: '온라인' },
  { value: 'off', label: '오프라인' },
  { value: 'onOff', label: '온/오프라인' },
];

const recruitsOption = [
  { value: 'und', label: '인원 미정' },
  { value: '1', label: '1명' },
  { value: '2', label: '2명' },
  { value: '3', label: '3명' },
  { value: '4', label: '4명' },
  { value: '5', label: '5명' },
  { value: '6', label: '6명' },
  { value: '7', label: '7명' },
  { value: '8', label: '8명' },
  { value: '9', label: '9명' },
  { value: 'mo', label: '10명 이상' },
];

const contactTypeOption = [
  { value: 'ok', label: '오픈톡' },
  { value: 'em', label: '이메일' },
  { value: 'gf', label: '구글 폼' },
];

const expectedPeriodOption = [
  { value: 'und', label: '기간 미정' },
  { value: '1', label: '1개월' },
  { value: '2', label: '2개월' },
  { value: '3', label: '3개월' },
  { value: '4', label: '4개월' },
  { value: '5', label: '5개월' },
  { value: '6', label: '6개월' },
  { value: 'lt', label: '장기' },
];

const positionsOption = [
  { value: 'ALL', label: '전체' },
  { value: 'FE', label: '프론트엔드' },
  { value: 'BE', label: '백엔드' },
  { value: 'DE', label: '디자이너' },
  { value: 'IOS', label: 'IOS' },
  { value: 'AND', label: '안드로이드' },
  { value: 'DEVOPS', label: '데브옵스' },
  { value: 'PM', label: 'PM' },
  { value: 'PD', label: '기획자' },
  { value: 'MK', label: '마케터' },
];

const positionsExceptAllOption = [
  { value: 'FE', label: '프론트엔드' },
  { value: 'BE', label: '백엔드' },
  { value: 'DE', label: '디자이너' },
  { value: 'IOS', label: 'IOS' },
  { value: 'AND', label: '안드로이드' },
  { value: 'DEVOPS', label: '데브옵스' },
  { value: 'PM', label: 'PM' },
  { value: 'PD', label: '기획자' },
  { value: 'MK', label: '마케터' },
];

const positionsMap = {
  ALL: '전체',
  FE: '프론트엔드',
  BE: '백엔드',
  DE: '디자이너',
  IOS: 'IOS',
  AND: '안드로이드',
  DEVOPS: '데브옵스',
  PM: 'PM',
  PD: '기획자',
  MK: '마케터',
};

const workExperienceOption = [
  { value: '0', label: '0년' },
  { value: '1', label: '1년' },
  { value: '2', label: '2년' },
  { value: '3', label: '3년' },
  { value: '4', label: '4년' },
  { value: '5', label: '5년' },
  { value: '6', label: '6년' },
  { value: '7', label: '7년' },
  { value: '8', label: '8년' },
  { value: '9', label: '9년' },
  { value: '10', label: '10년 이상' },
];

const urlOption = [
  { value: 'Link', label: 'Link' },
  { value: 'Github', label: 'Github' },
  { value: 'Notion', label: 'Notion' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Brunch', label: 'Brunch' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Youtube', label: 'Youtube' },
  { value: 'Brunch', label: 'Brunch' },
];

const filterSortOption = [
  { value: 'RECENT', label: '최신순' },
  { value: 'TRENDING', label: '인기순' },
];

const eventTypeOption = [
  { value: 'all', label: '전체' },
  { value: 'conference', label: '컨퍼런스' },
  { value: 'hackathon', label: '해커톤' },
  { value: 'contest', label: '공모전' },
  { value: 'bootcamp', label: '부트캠프' },
];

const viewOption = [
  { value: 'general', label: '리스트뷰' },
  { value: 'calendar', label: '캘린더뷰' },
];

const userStatusOption = [
  { value: 'pjt_bld', label: '사이드 프로젝트 팀빌딩 중이에요' },
  { value: 'pjt_fnd', label: '사이드 프로젝트를 찾고있어요' },
  { value: 'sty_fnd', label: '스터디 그룹을 찾고 있어요' },
  { value: 'sty_bld', label: '스터디 팀원을 찾고 있어요' },
  { value: 'sta_crt', label: '창업을 준비중이에요' },
  { value: 'sta_bld', label: '초기 멤버를 찾고 있어요' },
  { value: 'evt_bld', label: '공모전에 참여할 팀원을 구해요' },
  { value: 'evt_fnd', label: '참여할 공모전을 찾고 있어요' },
];

const userSkillOption = {
  개발: [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'nodejs', label: 'Nodejs' },
    { value: 'spring', label: 'Spring' },
    { value: 'java', label: 'Java' },
    { value: 'nextjs', label: 'Nextjs' },
    { value: 'nestjs', label: 'Nestjs' },
    { value: 'express', label: 'Express' },
    { value: 'go', label: 'Go' },
    { value: 'c', label: 'C' },
    { value: 'python', label: 'Python' },
    { value: 'django', label: 'Django' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'php', label: 'php' },
    { value: 'graphql', label: 'GraphQL' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'reactnative', label: 'ReactNative' },
    { value: 'unity', label: 'Unity' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'aws', label: 'AWS' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'docker', label: 'Docker' },
    { value: 'git', label: 'Git' },
    { value: 'svelte', label: 'Svelte' },
  ],
  기획: [
    { value: 'pm', label: '일반 기획' },
    { value: 'svcpm', label: '서비스 기획' },
    { value: 'vuspm', label: '사업개발' },
    { value: 'mgtpm', label: '프로덕트 관리' },
    { value: 'dtapm', label: '데이터 분석' },
  ],
  디자인: [
    { value: 'uide', label: 'UI 디자인' },
    { value: 'uxde', label: 'UX 디자인' },
    { value: 'webde', label: '웹 디자인' },
    { value: 'grhde', label: '그래픽 디자인' },
    { value: 'brdde', label: '브랜드 디자인' },
    { value: 'prtde', label: '제품 디자인' },
    { value: 'figma', label: 'Figma' },
    { value: 'photoshop', label: 'Photoshop' },
    { value: 'illustrator', label: 'Illustrator' },
    { value: 'XD', label: 'XD' },
    { value: 'zeplin', label: 'Zeplin' },
    { value: 'sketch', label: 'Sketch' },
    { value: 'protopie', label: 'ProtoPie' },
    { value: 'de3d', label: '3D' },
  ],
  마케팅: [
    { value: 'brdmk', label: '브랜드 마케팅' },
    { value: 'grsmk', label: '그로스 마케팅' },
    { value: 'cotmk', label: '콘텐츠 마케팅' },
    { value: 'pepmk', label: '퍼포먼스 마케팅' },
    { value: 'prmk', label: 'PR' },
    { value: 'appmk', label: '앱 마케팅' },
    { value: 'prmtmk', label: '프로모션 마케팅' },
    { value: 'alemk', label: '제휴 마케팅' },
    { value: 'campmk', label: '캠페인 마케팅' },
  ],
};

export {
  languageList,
  studyOrProjectOption,
  onlineOrOfflineOption,
  recruitsOption,
  contactTypeOption,
  expectedPeriodOption,
  languageMap,
  positionsOption,
  positionsMap,
  positionsExceptAllOption,
  workExperienceOption,
  urlOption,
  filterSortOption,
  eventTypeOption,
  viewOption,
  userStatusOption,
  userSkillOption,
};
