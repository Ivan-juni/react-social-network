import { default as usersReducer, initialStateType, usersActions } from "../users-reducer";

let state: initialStateType;

  beforeEach(() => {
    state = {
      users: [
        {id: 0, name: 'Dimych 0', followed: false, photos: {small: null, large: null}, status: "status 0"},
        {id: 1, name: 'Dimych 0', followed: false, photos: {small: null, large: null}, status: "status 1"},
        {id: 2, name: 'Dimych 0', followed: false, photos: {small: null, large: null}, status: "status 2"},
        {id: 3, name: 'Dimych 0', followed: true, photos: {small: null, large: null}, status: "status 3"},
      ],
      pageSize: 5,
      usersCount: 0,
      currentPage: 1,
      isFetching: false,
      isFollowingInProgress: [], // array of user's id
      filter: {
        term: "",
        friend: null 
      } 
    }
  })

test("changing of user's followed property is correct (follow)", () => {
  //* follow
  // 1. test data
  let action = usersActions.follow(1);

  // 2. action
  const newState = usersReducer(state, action);

  //3. expected result
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});
test("changing of user's followed property is correct (unfollow)", () => {
  //* unfollow
  // 1. test data
  let action = usersActions.follow(3);

  // 2. action
  const newState = usersReducer(state, action);

  //3. expected result
  expect(newState.users[3].followed).toBeFalsy();
});


test("followed userId should be added in the array", () => {
  // 1. test data
  const action = usersActions.toggleIsFollowingInProgress(true, 3);

  // 2. action
  const newState = usersReducer(state, action);

  //3. expected result
  expect(newState.isFollowingInProgress[0]).toBe(3);
});