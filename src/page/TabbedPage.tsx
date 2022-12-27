import { TabbedContent } from "../components/common/TabbedContents";

export function TabbedPage() {
  return (
    <TabbedContent tabs={[<span>one</span>, <span>two</span>]}>
      <div>tab one's contents</div>
      <div>tab two's contents</div>
    </TabbedContent>
  );
}
