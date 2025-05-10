import { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./TabbedContents.css";
import { useTabbedContentsControl } from "./useTabbedContentsControl";

function toArray<T>(x: T | T[]) {
  return Array.isArray(x) ? x : [x];
}

interface TabHeaderProps {
  tabIndex: number;
  onChangeTab: (tabIndex: number) => void;
  children: ComponentChildren;
}

function TabsHeader({ children, tabIndex, onChangeTab }: TabHeaderProps) {
  const childArray = toArray(children);

  return (
    <div className="tabbed-contents-header">
      {childArray.map((child, index) => (
        <div
          className="tabbed-contents-header-tab"
          data-selected={tabIndex === index}
          onClick={() => onChangeTab(index)}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface TabsBodyProps {
  tabIndex: number;
  children: ComponentChildren;
}

function TabsBody({ tabIndex, children }: TabsBodyProps) {
  const childArray = toArray(children);

  return (
    <div style={{ paddingTop: "8px" }}>
      {childArray[tabIndex] ?? childArray[0]}
    </div>
  );
}

interface TabbedContentProps {
  tabs: ComponentChildren;
  children: ComponentChildren;
}

export function TabbedContent({ tabs, children }: TabbedContentProps) {
  const [tabIndex, setTabIndex] = useTabbedContentsControl();

  return (
    <>
      <TabsHeader
        tabIndex={tabIndex}
        onChangeTab={setTabIndex}
        children={tabs}
      />
      <TabsBody tabIndex={tabIndex} children={children} />
    </>
  );
}
