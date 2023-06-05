import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

const fetchGitHubUser = async (accessToken) => { //access token 기반으로 username불러오기
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const username = data.login;
      return username;
    } else {
      throw new Error('Failed to fetch GitHub user data');
    }
  } catch (error) {
    console.error('Failed to fetch GitHub user data:', error);
    // 오류 처리 로직
  }
};
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
  
  console.log("function in : ", user_profile_info)
  const router = useRouter();

  //console.log('GitHub Username:', user.login);
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
  //로그인 된 경우 Login 버튼 없애기
  return (
    <>
      <section className="text-gray-600 body-font mb-24">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
          <div
            onClick={onClick}
            className="card rounded-md w-96 h-60 border-2 border-black"
          >
            <div className="front">
              <div className="profile">
                <img
                  class="profileimg"
                  src={user_profile_info.avatar_url}
                  alt="profileimg"
                ></img>
              </div>
              <div className="introduction">{user_profile_info.bio}</div>

              <div className="followers_num">
                👨‍👦‍👦 {user_profile_info.followers}
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
              {orgs[0] && (
                <div
                  className="image1"
                  src={orgs[0].avatar_url}
                  alt="profileimg"
                ></div>
              )}
              {orgs[1] && (
                <div
                  className="image2"
                  src={orgs[1].avatar_url}
                  alt="profileimg"
                ></div>
              )}
              {orgs[2] && (
                <div
                  className="image3"
                  src={orgs[2].avatar_url}
                  alt="profileimg"
                ></div>
              )}
              {orgs[3] && (
                <div
                  className="image4"
                  src={orgs[3].avatar_url}
                  alt="profileimg"
                ></div>
              )}
              {orgs[4] && (
                <div
                  className="image5"
                  src={orgs[4].avatar_url}
                  alt="profileimg"
                ></div>
              )}
              <hr className="line" />
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
                <div className="flex-shrink-0 mt-0 mb-0 p-0">
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${user_profile_info.login}&show_icons=true&theme=`}
                    className="h-40"
                  />
                </div>
                <div className="flex mt-[-3px] mb-0 p-0">
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user_profile_info.login}&hide_progress=true`}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
          <style jsx="jsx">
            {`
              .card {
                transition: transform 1s;
                transform-style: preserve-3d;
                cursor: pointer;
                transform: rotateY(0);
                position: relative;
              }

              .back,
              .front {
                border-radius: 7px;
                color: black;
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                backface-visibility: hidden;
              }

              .back {
                transform: rotateY(180deg);
              }

              .profile {
                left: 35px;
                top: 15px;
                width: 90px;
                height: 90px;
                background: rgba(191, 255, 255, 0.800000011920929);
                opacity: 1;
                position: absolute;
                border-radius: 50%;
                overflow: hidden;
                background-position: center center;
                border: 1.5px solid #000000;
              }

              .introduction {
                width: 125px;
                left: 20px;
                top: 110px;
                position: absolute;
                font-size: 5px;
                text-align: center;
              }

              .followers_num {
                left: 10px;
                top: 155px;
                position: absolute;
                font-size: 10px;
                font-family: NanumSquare Neo;
                font-weight: Regular;
                display: inline-block;
                white-space: nowrap;
              }

              .followers {
                position: absolute;
                top: 155px;
                left: 45px;
                font-size: 10px;
                opacity: 0.5;
                font-family: NanumSquare Neo;
                font-weight: Regular;
              }

              .following_num {
                left: 95px;
                top: 155px;
                position: absolute;
                font-size: 10px;
                font-family: NanumSquare Neo;
                font-weight: Regular;
              }

              .following {
                position: absolute;
                top: 155px;
                left: 110px;
                font-size: 10px;
                opacity: 0.5;
                font-family: NanumSquare Neo;
                font-weight: Regular;
              }

              .organization {
                left: 13px;
                top: 175px;
                position: absolute;
                font-size: 10px;
                font-family: NanumSquare Neo;
                font-weight: Regular;
                display: inline-block;
                white-space: nowrap;
              }

              .email {
                left: 13px;
                top: 195px;
                position: absolute;
                font-size: 10px;
                font-family: NanumSquare Neo;
                font-weight: Regular;
                display: inline-block;
                white-space: nowrap;
              }

              .location {
                left: 11px;
                top: 215px;
                position: absolute;
                font-size: 10px;
                font-family: NanumSquare Neo;
                font-weight: Regular;
                display: inline-block;
                white-space: nowrap;
              }

              .name {
                left: 160px;
                top: 20px;
                position: absolute;
                font-size: 25px;
                font-family: NanumSquare Neo;
                font-weight: Heavy;
                display: inline-block;
                white-space: nowrap;
              }

              .git-id {
                left: 160px;
                top: 50px;
                position: absolute;
                font-size: 17px;
                opacity: 0.5;
                font-family: NanumSquare Neo;
                display: inline-block;
                white-space: nowrap;
              }

              .image1 {
                position: absolute;
                width: 25px;
                height: 25px;
                border-radius: 7px;
                opacity: 0.6;
                top: 80px;
                left: 160px;
              }

              .image2 {
                position: absolute;
                width: 25px;
                height: 25px;
                border-radius: 7px;
                opacity: 0.6;
                top: 80px;
                left: 190px;
              }

              .image3 {
                position: absolute;
                width: 25px;
                height: 25px;
                border-radius: 7px;
                opacity: 0.6;
                top: 80px;
                left: 190px;
              }

              .image4 {
                position: absolute;
                width: 25px;
                height: 25px;
                border-radius: 7px;
                opacity: 0.6;
                top: 80px;
                left: 190px;
              }

              .image5 {
                position: absolute;
                width: 25px;
                height: 25px;
                border-radius: 7px;
                opacity: 0.6;
                top: 80px;
                left: 190px;
              }

              .line {
                position: absolute;
                width: 220px;
                border: 1px solid #808080;
                left: 158px;
                top: 110px;
              }

              .repos1 {
                position: absolute;
                border-radius: 7px;
                border-color: gray;
                border-width: 1px;
                width: 220px;
                height: 50px;
                left: 158px;
                top: 120px;
              }

              .typelevel-parser1 {
                position: relative;
                left: 10px;
                font-size: 10px;
                color: rgb(0, 153, 255);
                font-family: NanumSquare Neo;
                font-weight: Heavy;
              }

              .stars1 {
                position: relative;
                top: -13px;
                left: 120px;
                font-size: 10px;
                font-family: NanumSquare Neo;
              }

              .TypeScript1 {
                position: relative;
                top: -28px;
                left: 155px;
                font-size: 10px;
                font-family: NanumSquare Neo;
              }

              .text1 {
                position: relative;
                left: 5px;
                top: -30px;
                font-size: 10px;
                font-family: NanumSquare Neo;
              }

              .repos2 {
                position: absolute;
                border-radius: 7px;
                border-color: gray;
                border-width: 1px;
                width: 220px;
                height: 50px;
                left: 158px;
                top: 180px;
              }

              .typelevel-parser2 {
                position: relative;
                left: 10px;
                font-size: 10px;
                color: rgb(0, 153, 255);
                font-family: NanumSquare Neo;
                font-weight: Heavy;
              }

              .stars2 {
                position: relative;
                top: -13px;
                left: 120px;
                font-size: 10px;
                font-family: NanumSquare Neo;
              }

              .TypeScript2 {
                position: relative;
                top: -28px;
                left: 155px;
                font-size: 10px;
                font-family: NanumSquare Neo;
              }

              .text2 {
                position: relative;
                left: 5px;
                top: -30px;
                font-size: 10px;
                font-family: NanumSquare Neo;
              }
            `}
          </style>
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <div className="flex w-full justify-center items-end">
              <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                <label
                  htmlFor="hero-field"
                  className="leading-7 text-sm text-gray-600"
                >
                  Markdown code:
                </label>
                <input
                  ref={inputRef2}
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  defaultValue={`[![MY IT 명함](https://git-business-card.web.app/mycard/${user_profile_info.login})](https://git-business-card.web.app)`}
                  className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div>
                <div>
                  <button
                    className="mr-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-12"
                    onClick={() => setShowModal(true)}
                  >
                    <pre>공유</pre>
                  </button>
                  <button
                    className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-12"
                    onClick={handleCopy2}
                  >
                    <pre>복사</pre>
                  </button>
                </div>
                <Modal onClose={() => setShowModal(false)} show={showModal}>
                  <section className="text-gray-600 body-font">
                    <div className="container mx-auto flex px-5  justify-center items-center">
                      <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
                        <div className="flex w-full justify-center items-end">
                          <div className="relative mr-4 lg:w-full md:w-full text-left">
                            <label
                              htmlFor="hero-field"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Image URL:
                            </label>
                            <input
                              type="text"
                              id="hero-field"
                              name="hero-field"
                              ref={inputRef1}
                              defaultValue={`https://git-business-card.web.app/mycard/${user_profile_info.login}`}
                              className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>

                          <button
                            onClick={handleCopy1}
                            className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-12"
                          >
                            <pre>복사</pre>
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </Modal>
              </div>
            </div>
            <div className="flex"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserPage;