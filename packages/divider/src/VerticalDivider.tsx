import React, {
  FC,
  forwardRef,
  HTMLAttributes,
  Ref,
  useCallback,
  useState,
} from "react";
import { applyRef, WithForwardedRef } from "@react-md/utils";

import Divider from "./Divider";

export interface VerticalDividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The max height for the vertical divider. This number **must** be greater than 0 to work
   * correctly.
   *
   * When the value is between 0 and 1, it will be used as a multiplier with the
   * parent element's height. When the value is greater than 1, it will be used
   * in `Math.min(parentElementHeight, maxHeight)`.
   */
  maxHeight?: number;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<VerticalDividerProps, "maxHeight">>;
type WithDefaultProps = VerticalDividerProps & DefaultProps & WithRef;

interface VerticalDividerHeight {
  ref: (instance: HTMLDivElement | null) => void;
  height: number | undefined;
}

/**
 * This is a small hook that is used to automatically create a vertical divider based
 * on the computed height of its parent element.
 *
 * @param maxHeight The max height for the vertical divider. When the value is between
 * 0 and 1, it will be used as a percentage. Otherwise the smaller value of parent element
 * height and this will be used.
 */
export function useVerticalDividerHeight(
  maxHeight: number,
  forwardedRef?: Ref<HTMLDivElement | null> | undefined
): VerticalDividerHeight {
  if (process.env.NODE_ENV !== "production" && maxHeight < 0) {
    throw new Error(
      "The `maxHeight` for a vertical divider height must be greater than 0"
    );
  }

  const [height, setHeight] = useState<number | undefined>(undefined);
  const ref = useCallback(
    (instance: HTMLDivElement | null) => {
      applyRef(instance, forwardedRef);
      if (!instance || !instance.parentElement) {
        return;
      }

      const height = instance.parentElement.offsetHeight;
      if (maxHeight <= 1) {
        setHeight(height * maxHeight);
      } else {
        setHeight(Math.min(height, maxHeight));
      }
    },
    [maxHeight, forwardedRef]
  );

  return { ref, height };
}

/**
 * This component is used to create a vertical divider based on a parent element's
 * height. This is really only needed when the parent element **has no defined height**.
 * If there is a defined height, this component is not worth much as the height can
 * be computed in css as normal. This really just fixes the issue that the height would
 * be set to `auto` (which computes to 0 most of the time) when it is not set on a parent
 * element.
 */
const VerticalDivider: FC<VerticalDividerProps & WithRef> = providedProps => {
  const {
    style,
    maxHeight,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  const { ref, height } = useVerticalDividerHeight(maxHeight, forwardedRef);
  return <Divider {...props} style={{ ...style, height }} ref={ref} vertical />;
};

const defaultProps: DefaultProps = {
  maxHeight: 1,
};

VerticalDivider.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    VerticalDivider.propTypes = {
      maxHeight: PropTypes.number,
      // @ts-ignore
      _validateMaxHeight: (
        { maxHeight }: WithDefaultProps,
        _: string,
        componentName: string
      ) => {
        if (maxHeight < 0) {
          return new Error(
            `The maxHeight prop for \`${componentName}\` must be a number greater ` +
              `than 0, but received \`${maxHeight}\`.`
          );
        }

        return null;
      },
    };
  }
}

export default forwardRef<HTMLDivElement, VerticalDividerProps>(
  (props, ref) => <VerticalDivider {...props} forwardedRef={ref} />
);
