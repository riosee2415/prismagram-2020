export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("You Need To Login To Perform Thsi Action");
  }

  return;
};
