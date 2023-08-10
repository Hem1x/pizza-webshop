import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaLoaderBlock = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={260}
      height={465}
      viewBox="0 0 260 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ marginBottom: 40 }}
      {...props}>
      <circle cx="126" cy="127" r="123" />
      <rect x="7" y="278" rx="5" ry="5" width="251" height="15" />
      <rect x="7" y="308" rx="5" ry="5" width="248" height="84" />
      <rect x="112" y="425" rx="5" ry="5" width="143" height="47" />
      <rect x="7" y="425" rx="5" ry="5" width="1" height="7" />
      <rect x="6" y="425" rx="5" ry="5" width="78" height="47" />
    </ContentLoader>
  );
};

export default PizzaLoaderBlock;
