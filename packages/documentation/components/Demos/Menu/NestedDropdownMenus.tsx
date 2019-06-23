import React, { FC, Fragment } from "react";
import { Checkbox } from "@react-md/form";
import {
  DropdownMenu,
  DropdownMenuItem,
  MenuItemSeparator,
} from "@react-md/menu";
import { useToggle } from "@react-md/utils";

const InfiniteNestedMenus: FC<{
  depth: number;
  index: number;
  portal: boolean;
}> = ({ depth, index, portal }) => (
  <DropdownMenuItem
    id={`nested-menu-depth-${index}-${depth}`}
    portal={portal}
    items={[
      "Item 1",
      "Item 2",
      ...Array.from(new Array(4), (_, i) => (
        <InfiniteNestedMenus depth={depth + 1} index={i} portal={portal} />
      )),
      "Item 8",
    ]}
  >
    {`Current depth: ${depth} and index: ${index}`}
  </DropdownMenuItem>
);

const NestedDropdownMenus: FC = () => {
  const { toggled: portal, setToggled: setPortal } = useToggle(true);

  return (
    <Fragment>
      <Checkbox
        id="nested-menu-portal"
        name="portal"
        label="Enable Portal?"
        checked={portal}
        onChange={event => setPortal(event.currentTarget.checked)}
      />
      <DropdownMenu
        id="simple-nested-menus-example"
        portal={portal}
        items={[
          "Item 1",
          "Item 2",
          <MenuItemSeparator />,
          <InfiniteNestedMenus depth={0} index={0} portal={portal} />,
          "Item 4",
          "Item 5",
        ]}
      >
        Simple
      </DropdownMenu>
    </Fragment>
  );
};

export default NestedDropdownMenus;
