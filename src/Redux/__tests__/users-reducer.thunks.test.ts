import { default as usersReducer, followThunkCreator, usersActions} from "../users-reducer";
import { ResponseType } from "../../api/api.ts";
import { usersAPI } from '../../api/users-api';
import { ResultCodesEnum } from "../../api/api";

jest.mock('../../api/users-api');
const result: ResponseType = {
  resultCode: ResultCodesEnum.Sucess,
  messages: [],
  data: {}
}

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

test("follow thunk", async() => {
  usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

  const thunk  = followThunkCreator(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {})
  expect(dispatchMock).toBeCalledTimes(4);
  expect(dispatchMock).toHaveBeenCalledWith(usersActions.toggleIsFollowingInProgress(true, 1))
  // expect(dispatchMock).toHaveBeenCalledWith(2, usersActions.follow(1))
  // expect(dispatchMock).toHaveBeenCalledWith(3, usersActions.getFriendsTC())
  // expect(dispatchMock).toHaveBeenCalledWith(4, usersActions.toggleIsFollowingInProgress(false, 1))
});

