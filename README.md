## mycard_page
Git_Business_Card_Web 코드에서 부분 발췌하여 vercel 배포

### 목적
Gi_Business_Card_App에서 Web이 만든 명함을 사용할 수 있도록 별도의 페이지 제작

### 기능
#### My Card
- 기본
https://mycard-page.vercel.app/mycard/${username}  
![image](https://github.com/ssoxong/mycard_page/assets/112956015/52cce0a8-0bf3-4673-8add-f13085f94a29)  
username 기반으로 깃허브 API를 불러와 명함 형태로 구현

- 명함 클릭시
![image](https://github.com/ssoxong/mycard_page/assets/112956015/696e763b-ce22-4943-959b-f46bd257d0db)
사용자가 깃허브에서 얼마나 활동했는지 나타내고, 주요 사용 언어를 출력함


##### Following Card
https://mycard-page.vercel.app/mycard/following_card/${username}  
mycard와 동일한 형태로, 사용자가 팔로우하고있는 유저들의 명함을 보여준다.
