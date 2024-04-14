import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background: #f9f9f9;
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-bottom: 8px;
  text-align: center;
  line-height: 150%;
  overflow-wrap: break-word;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const UserContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const UserImg = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const UserName = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: -0.04em;
  color: #000000;
`;

export const StudyDate = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #333333;
`;

export const ProjectInfoContainer = styled.div`
  margin-top: 10px;
  padding: 20px;
  word-break: break-all;
  line-height: 180%;
`;

export const ProjectInfo = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
`;

export const ProjectIcon = styled.img`
  display: block;
  width: 28px;
  height: 28px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border: 1px solid #f2f2f2;
  margin-top: 16px;
  margin-bottom: 30px;
`;

export const BackBtn = styled.img`
  width: 28px;
  height: 28px;
`;

export const InfoWrapper = styled.div`
  background-color: white;
`;

export const Content = styled.div`
  img {
    width: 100%;
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 18px;
  }
`;

export const BottomSection = styled.div`
  padding: 20px;
`;

export const ApplyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: fixed;
  bottom: 0px;
  padding: 10px 20px;
  width: 100%;
  z-index: 3;
  background-color: white;
  border-top: 1px solid #f2f2f2;
  padding-bottom: calc(env(safe-area-inset-bottom) + 10px);
`;

export const ApplyButton = styled.button`
  flex: 1;
  height: 44px;
  background: #6ed1c0;
  border-radius: 50px;
  color: #ffffff;
  font-weight: 700;
  font-size: 17px;
`;

export const ShareButton = styled.button`
  flex: 1;
  height: 44px;
  background: #f1f1f1;
  border-radius: 50px;
  font-weight: 700;
  font-size: 17px;
  color: #858585;
`;

export const LikeContainer = styled.div`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const LikesImg = styled.img`
  display: block;
  width: 28px;
  height: auto;
  background: transparent;
`;
