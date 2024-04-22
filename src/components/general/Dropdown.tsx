import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";

type DropdownOption = {
  value: string;
  text: string;
};
type DropdownType = {
  options: DropdownOption[];
  value?: string;
  onSelect?: (value: string) => void;
};

const DropdownWrapper = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  direction: theme.dir,
  fontSize: theme.settingFontSize,

  "&.dialog-dropdown": {
    marginBottom: "10px",

    "&:last-child": {
      marginBottom: 0,
    },
  },

  "&.dialog-dropdown > div": {
    borderColor: "rgba(0,0,0,0.1)",
    background: "#f1f1f1",
  },
  "&.dialog-dropdown > ul": {
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
}));

const DropdownInput = styled.div(({ theme }) => ({
  cursor: "pointer",
  border: `1px solid ${theme.iconColor}33`,
  padding: "4px 8px",
  height: "36px",
  borderRadius: "8px",
}));

const DropdownList = styled.ul(({ theme }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "absolute",
  zIndex: 10,
  right: 0,
  left: 0,
  top: "40px",
  border: `1px solid ${theme.iconColor}33`,
  borderRadius: "8px",
}));

const DropdownListItem = styled.li({
  padding: "4px 8px",
});

const Dropdown = ({
  options,
  value,
  onSelect,
  className,
}: DropdownType & HTMLAttributes<HTMLElement>) => {
  const defaultOption: DropdownOption = {
    value: "",
    text: "انتخاب کنید",
  };

  const [val, setVal] = useState<DropdownOption>(
    value
      ? options.find((x) => x.value === value) || defaultOption
      : defaultOption,
  );

  const [open, setOpen] = useState<boolean>(false);

  const selectOption = (option: DropdownOption) => {
    setVal(option);
    setOpen(false);
    onSelect?.(option.value);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <DropdownWrapper className={className}>
      <DropdownInput onClick={toggleOpen}>{val.text}</DropdownInput>
      {open && (
        <DropdownList>
          {options.map((option) => (
            <DropdownListItem
              key={option.value}
              onClick={() => selectOption(option)}
            >
              {option.text}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};
export default Dropdown;
