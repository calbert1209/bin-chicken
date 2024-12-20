import { ComponentChild, ComponentChildren } from "preact";

type ShowProps = {
  when: boolean;
  children: ComponentChild | ComponentChildren;
}

export const Show = ({
  when,
  children,
}: ShowProps) => {
  return when ? <>{children}</> : null;
};