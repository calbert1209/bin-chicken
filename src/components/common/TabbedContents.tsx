import { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./TabbedContents.css";

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
  const [tabIndex, setTabIndex] = useState(getTabIndexFromQuery);

  // Add tab query param to URL if it doesn't exist
  useEffect(() => {
    if (!queryHasTabIndex()) {
      setTabIndexInQuery(tabIndex);
    }
  }, [location.search]);

  const updateTabIndex = (index: number) => {
    setTabIndex(index);
    setTabIndexInQuery(index);
  };

  return (
    <>
      <TabsHeader
        tabIndex={tabIndex}
        onChangeTab={updateTabIndex}
        children={tabs}
      />
      <TabsBody tabIndex={tabIndex} children={children} />
    </>
  );
}

const getTabIndexFromQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tabIndex = urlParams.get("tab");
  return tabIndex ? parseInt(tabIndex) : 0;
};

const queryHasTabIndex = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("tab");
};

const setTabIndexInQuery = (tabIndex: number) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("tab", tabIndex.toString());
  window.history.replaceState({}, "", "?" + urlParams.toString());
};
