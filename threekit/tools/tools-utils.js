export const findHitNode = (hitNodes, name) => {
  if (!hitNodes.length) return undefined;
  const hierarchy = [...hitNodes[0].hierarchy];
  hierarchy.reverse();

  return (
    hierarchy.find((el) =>
      typeof name === 'string' ? name === el.name : name.test(el.name)
    ) || undefined
  );
};

export const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export const metadataKeyValueToObject = (data) =>
  data.split(',').reduce((output, keVal) => {
    const [key, value] = keVal
      .trim()
      .split('=')
      .map((el) => el.trim());
    return Object.assign(output, { [key]: parseFloat(value) || value });
  }, {});
