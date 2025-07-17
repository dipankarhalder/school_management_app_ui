export const ComposeProviders = ({ providers, children }) => {
  return providers.reduceRight(
    // eslint-disable-next-line no-unused-vars
    (kids, Provider) => <Provider>{kids}</Provider>,
    children
  );
};
