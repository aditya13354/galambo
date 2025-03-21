export const getJSONDepth = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return 0;
  }

  let depth = 0;

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let currentDepth = getJSONDepth(obj[key]);
      if (currentDepth > depth) {
        depth = currentDepth;
      }
    }
  }

  return 1 + depth;
};
