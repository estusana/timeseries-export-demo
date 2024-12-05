import { Button, Flex, Modal } from "@mantine/core";
import { useState } from "react";
import { DatePicker } from "@mantine/dates";

interface DataModalProps {
  opened: boolean;
  close: () => void;
  sourceType: "meter" | "room" | null;
  sourceId: string | null;
}

export const DataModal = ({
  opened,
  close,
  sourceType,
  sourceId,
}: DataModalProps) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const onCloseHandler = () => {
    close();
    // reset selected value on close
    setValue([null, null]);
  };

  return (
    <Modal
      opened={opened}
      onClose={onCloseHandler}
      title="Download Timerange Data"
      size={"70%"}
    >
      <Flex gap={40}>
        <DatePicker type="range" value={value} onChange={setValue} />
        <div>
          <p>
            Selected {sourceType} id: {sourceId}
          </p>
        </div>
      </Flex>
      {/* <Button>Cancel</Button>*/}
      <Button>Save</Button>
    </Modal>
  );
};
