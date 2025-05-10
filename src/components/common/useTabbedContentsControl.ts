import { StateUpdater, useEffect, useState } from "preact/hooks";

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

export const useTabbedContentsControl = (): [number, (n: number) => void] => {
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

  return [tabIndex, updateTabIndex];
};
