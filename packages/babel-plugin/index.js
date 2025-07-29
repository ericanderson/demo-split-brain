module.exports = function(babel, options = {}) {
  return {
    name: "babel-plugin-define-things",
    visitor: {
      CallExpression(path, state) {
        if (path.node.callee.type === "Identifier" && path.node.callee.name === state.expected) {
          if (path.node.arguments.length === 2) {
            const [fn, opts] = path.node.arguments;
            if (fn && opts) {
              // Replace the call with the function itself
              path.replaceWith(fn);
              return;
            }
          }
        }
      },

      Identifier(path, state) {
        if (path.node.name === "defineThings") {
          if (path.parent.type === "ImportSpecifier") {
            state.expected = path.parent.local?.name ?? path.node.name;
            return;
          }
        }
      },
    },
  };
};
