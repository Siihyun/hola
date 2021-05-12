import httpClient from "./http_client";

/* 
user 관련 API를 정의한 class입니다.
*/

class User {
  constructor(httpClient) {
    this.user = httpClient;
  }

  // 사용자 정보를 수정합니다.
  // 닉네임이 변경될 경우 AccessToken을 다시 설정해야 합니다.
  modifyUserInfo = async (id, userData) => {
    console.log(`userService id : ${id} userData : ${userData.nickName}`)
    try {
      const user = await this.user.patch(`users/${id}`, userData);
      return user;
    } catch (error) {
      console.error(error);
    }
  };
}

const userService = new User(httpClient);
export default userService;