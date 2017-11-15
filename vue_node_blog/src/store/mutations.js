export const STATE_USERINFO = (state, object) => {
  state.userInfo._id = object._id
  state.userInfo.username = object.username
}
