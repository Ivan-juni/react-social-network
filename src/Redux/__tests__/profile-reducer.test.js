const {
  default: profileReducer,
  addPostActionCreator,
  deletePostAC,
} = require("../profile-reducer");

let state = {
  posts: [
    {
      id: 1,
      likes: 12,
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum maiores quaerat sit corporis mollitia, id dolore reprehenderit. Totam, pariatur nisi?",
    },
    { id: 2, likes: 3, text: "Hello, everybody!" },
  ],
};

test("new post length should be incremented", () => {
  // 1. test data
  let action = addPostActionCreator("post");

  // 2. action
  let newState = profileReducer(state, action);

  //3. expected result
  expect(newState.posts.length).toBe(3);
});

test("new post text should be correct", () => {
  // 1. test data
  let action = addPostActionCreator("post");

  // 2. action
  let newState = profileReducer(state, action);

  //3. expected result
  expect(newState.posts[2].text).toBe("post");
});

test("length should be decremented after deleting", () => {
  // 1. test data
  let action = deletePostAC(1);

  // 2. action
  let newState = profileReducer(state, action);

  //3. expected result
  expect(newState.posts.length).toBe(1);
});
