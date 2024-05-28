import { useQuery } from 'react-query';
import userService from 'service/user_service';
import { useSelector } from 'react-redux';

export const useGetNotices = () => {
  const user = useSelector((state) => state.user);
  const queryKey = ['api', 'get', 'notices'];
  return useQuery(queryKey, userService.getUserAlarm, {
    enabled: !!user.nickName,
    select: (d) => d.data,
    refetchInterval: 1000 * 60,
  });
};
