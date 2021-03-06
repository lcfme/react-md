import React, { FC } from "react";
import { TextContainer, Text } from "@react-md/typography";
import { AppSizeListener, useAppSize } from "@react-md/utils";

import CodeBlock from "components/Code/CodeBlock";

const CurrentSize: FC = () => {
  const context = useAppSize();
  return (
    <TextContainer>
      <Text type="headline-6">The current app size is:</Text>
      <CodeBlock language="json">{JSON.stringify(context, null, 2)}</CodeBlock>
    </TextContainer>
  );
};

const AppSizeListenerExample: FC = () => (
  <AppSizeListener>
    <CurrentSize />
  </AppSizeListener>
);

export default AppSizeListenerExample;
