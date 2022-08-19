const {
  default: usersReducer,
  toggleisFollowingInProgress,
} = require("../users-reducer");

let state = {
  users: [],
  pageSize: 5,
  usersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [],
};

test("followed userId should be added in the array", () => {
  // 1. test data
  let action = toggleisFollowingInProgress(true, 3);

  // 2. action
  let newState = usersReducer(state, action);

  //3. expected result
  expect(newState.isFollowingInProgress[0]).toBe(3);
});
