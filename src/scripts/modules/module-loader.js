export default async function moduleLoader(componentName) {
  const { default: module } = await import(`../components/${componentName}`);
  return module;
}
