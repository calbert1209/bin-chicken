import { LockIcon, UnlockIcon } from "../assets/icons";
import { FilledIcon } from "../components/common/FilledIcon";
import { LabeledIcon } from "../components/common/LabeledIcon";
import { TabbedContent } from "../components/common/TabbedContents";
import { EncryptTab } from "../components/EncryptTab/EncryptTab";

export function TabbedPage() {
  return (
    <TabbedContent
      tabs={[
        <LabeledIcon label="→">
          <LockIcon />
        </LabeledIcon>,
        <LabeledIcon label="→">
          <UnlockIcon />
        </LabeledIcon>,
      ]}
    >
      <EncryptTab />
      <div>tab two's contents</div>
    </TabbedContent>
  );
}
