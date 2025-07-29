export const defineThings = (fn, opts) => {
  return {
    __DEFINE_THINGS_MARKER: true,
    opts,
  };
};
