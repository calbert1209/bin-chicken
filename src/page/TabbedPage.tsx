import { LockIcon, UnlockIcon } from "../assets/icons";
import { FilledIcon } from "../components/common/FilledIcon";
import { LabeledIcon } from "../components/common/LabeledIcon";
import { TabbedContent } from "../components/common/TabbedContents";
import { DecryptTab } from "../components/DecryptTab/DecryptTab";
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
      <DecryptTab />
    </TabbedContent>
  );
}
