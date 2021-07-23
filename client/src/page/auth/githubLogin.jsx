import { useEffect } from "react";
import qs from "qs";
import { useHistory, useLocation } from "react-router";
import { fetchUserById } from "../../store/user";
import { useDispatch } from "react-redux";
import { setModalVisible, nextStep } from "../../store/loginStep";
import Modal from "../../component/modal/modal_component/modal";
import LoadingSpinner from "../../component/loading/loadingSpinner";

/* 

github login component 입니다.
github에서 popup login을 만들어 주지 않아 자체적으로 component를 만들었고,
code와 함께 redirection 되면 login 시도 후 main으로 이동합니다.


*/

const GithubLogin = () => {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = () => {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const userData = { code, social: "github" };
      console.log("gitgub Login", code);
      dispatch(fetchUserById(userData)).then((response) => {
        console.log("res: !! ", response);
        if (response.payload.loginSuccess === false) {
          // signUp 진행
          console.log("res: !! ", response);
          dispatch(setModalVisible(true));
          dispatch(nextStep());
        }
        //history.push("/");
      });
    };

    getToken();
  }, [dispatch, history, location.search]);

  return (
    <Modal visible={true} name="loading">
      <LoadingSpinner />
    </Modal>
  ); // 이 부분에 로딩바와 같은 페이지를 렌더링 해도 좋아요.
};

export default GithubLogin;
