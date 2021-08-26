const resetStubAndSpys = (stubsAndSpysArray) => {
  stubsAndSpysArray.forEach(function (element) {
    try {
      element.restore();
    } catch (error) {}
  }, this);
};

export { resetStubAndSpys };
