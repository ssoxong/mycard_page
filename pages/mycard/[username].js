import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import '../../styles/global.css';

// const fetchGitHubUser = async (accessToken) => { //access token 기반으로 username불러오기
//   try {
//     const response = await fetch('https://api.github.com/user', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const username = data.login;
//       return username;
//     } else {
//       throw new Error('Failed to fetch GitHub user data');
//     }
//   } catch (error) {
//     console.error('Failed to fetch GitHub user data:', error);
//     // 오류 처리 로직
//   }
// };
// export async function getStaticPaths() {
//   // 여기에서 필요한 로직을 추가하여 사용자 목록을 가져올 수 있습니다.
//   // 예시로 두 명의 사용자를 가정합니다.
//   const users = ['user1', 'user2'];

//   const paths = users.map((username) => ({
//     params: { username },
//   }));
//   return {
//     paths,
//     fallback: true, // fallback을 true로 설정하여 정적으로 미리 생성되지 않은 페이지도 렌더링될 수 있도록 합니다.
//   };
// }
export async function getStaticPaths() {
    return {paths: [], fallback: 'blocking'};
};



export async function getStaticProps({params}) {
  const name = params.username;
  const response1 = await fetch(`https://api.github.com/users/${name}`);
  const response2 = await fetch(`https://api.github.com/users/${name}/repos`);
  const response3 = await fetch(`https://api.github.com/users/${name}/orgs`);
  const user_profile_info = await response1.json();
  const repos = await response2.json();
  const orgs = await response3.json();
  return {
    props: {
        user_profile_info,
        repos,
        orgs
      }
  };
}

const UserPage = ({  user_profile_info, repos, orgs }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  function onClick(event) {
    const element = event.currentTarget;
    if (element.style.transform == "rotateY(180deg)") {
      element.style.transform = "rotateY(0deg)";
    } else {
      element.style.transform = "rotateY(180deg)";
    }
  }
  return (
      <>  < section>
        <div className="container mx-auto flex flex-col">
          <div onClick={onClick} className="card rounded-md w-96 h-60 bg-my-color">
              <div className="front">
                  <div className="profile">
                      <img className="profileimg" src={user_profile_info.avatar_url} alt="profileimg"></img>
                  </div>
                  <div className="introduction">{user_profile_info.bio}</div>

                  <div className="followers_num">
                      👨‍👦‍👦{user_profile_info.followers}
                  </div>
                  <div className="followers">followers</div>
                  <div className="following_num">
                      {user_profile_info.following}
                  </div>
                  <div className="following">following</div>
                  <div className="organization">
                      🏙 {user_profile_info.company}
                  </div>
                  <div className="email">✉ {user_profile_info.email}</div>
                  <div className="location">🌍 {user_profile_info.location}</div>

                  <div className="name">{user_profile_info.name}</div>
                  <div className="git-id">@{user_profile_info.login}</div>
                  {
                      orgs[0] && (
                          <div className="image1" src={orgs[0].avatar_url} alt="profileimg"></div>
                      )
                  }
                  {
                      orgs[1] && (
                          <div className="image2" src={orgs[1].avatar_url} alt="profileimg"></div>
                      )
                  }
                  {
                      orgs[2] && (
                          <div className="image2" src={orgs[1].avatar_url} alt="profileimg"></div>
                      )
                  }
                  {
                      orgs[3] && (
                          <div className="image2" src={orgs[1].avatar_url} alt="profileimg"></div>
                      )
                  }
                  {
                      orgs[4] && (
                          <div className="image2" src={orgs[1].avatar_url} alt="profileimg"></div>
                      )
                  }
                  <hr className="line"/>
                  <div className="repos1">
                      <div className="typelevel-parser1">📌{repos[0].name}</div>
                      <div className="stars1">⭐{repos[0].stargazers_count}</div>
                      <div className="TypeScript1">🔵{repos[0].language}</div>
                      <div className="text1">{repos[0].descriptions}</div>
                  </div>
                  <div className="repos2">
                      <div className="typelevel-parser2">📌{repos[1].name}</div>
                      <div className="stars2">⭐{repos[1].stargazers_count}</div>
                      <div className="TypeScript2">🔵{repos[1].language}</div>
                      <div className="text2">{repos[1].descriptions}</div>
                  </div>
              </div>

              <div className="back">
              <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex-shrink-0 mt-0 mb-0 p-0" >
                  <img    

                    src={`https://github-readme-stats.vercel.app/api?username=${user_profile_info.login}&show_icons=true&theme=tokyonight`}
                    className="h-40"

                    />
                  </div>
                  <div className="flex-shrink-0" >
                    <img
                      src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user_profile_info.login}&hide_progress=true&theme=tokyonight`}
                      className="h-20"
                    />
                  </div>
                </div>
              </div>
          </div>
  
      </div>
  </section>
</>
  );
}

export default UserPage;