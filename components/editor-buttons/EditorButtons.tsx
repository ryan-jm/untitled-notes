import { useCommands } from '@remirror/react';

import { Box, Button, ButtonGroup, Menu, MenuButton, MenuList, MenuItem, Tooltip, Divider } from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import 'remirror/styles/all.css';

const BoldButton = () => {
  const commands = useCommands();

  return (
    <Tooltip label="Bold | Ctrl + B">
      <Button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.toggleBold()}>
        <b>B</b>
      </Button>
    </Tooltip>
  );
};

const ItalicButton = () => {
  const commands = useCommands();

  return (
    <Tooltip label="Italic | Ctrl + I">
      <Button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.toggleItalic()}>
        <i>I</i>
      </Button>
    </Tooltip>
  );
};

const UnderlineButton = () => {
  const commands = useCommands();
  return (
    <Tooltip label="Underline | Ctrl + U">
      <Button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.toggleUnderline()}>
        <u>U</u>
      </Button>
    </Tooltip>
  );
};

const StrikeButton = () => {
  const commands = useCommands();
  return (
    <Tooltip label="Strikethrough | Ctrl + D">
      <Button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.toggleStrike()}>
        <s>S</s>
      </Button>
    </Tooltip>
  );
};

const HeadingButtons = () => {
  const commands = useCommands();
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Headings
        </MenuButton>
        <MenuList>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <MenuItem
              key={level}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => commands.toggleHeading({ level })}
            >
              H{level}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

const BlockquoteButton = () => {
  const commands = useCommands();
  return (
    <Button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.toggleBlockquote()}>
      Blockquote
    </Button>
  );
};

const CodeButton = () => {
  const commands = useCommands();
  return (
    <Button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.toggleCode()}>
      Code
    </Button>
  );
};

const UndoButton = () => {
  const commands = useCommands();
  return (
    <Tooltip label="Undo | Ctrl + Z">
      <Button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.undo()}>
        {/* <ChevronLeftIcon /> */}
        &lt; Undo
      </Button>
    </Tooltip>
  );
};

const RedoButton = () => {
  const commands = useCommands();
  return (
    <Tooltip label="Redo | Ctrl + Shift + Z">
      <Button onMouseDown={(event) => event.preventDefault()} onClick={() => commands.redo()}>
        Redo &gt;
      </Button>
    </Tooltip>
  );
};

const EditorButtons = () => {
  return (
    <>
      <ButtonGroup size="sm" isAttached variant="solid">
        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <StrikeButton />
      </ButtonGroup>
      &nbsp;
      <ButtonGroup size="sm" isAttached variant="solid">
        <HeadingButtons />
      </ButtonGroup>
      &nbsp;
      <ButtonGroup size="sm" isAttached variant="solid">
        <BlockquoteButton />
        <CodeButton />
      </ButtonGroup>
      &nbsp;
      <ButtonGroup size="sm" isAttached variant="solid">
        <UndoButton />
        <RedoButton />
      </ButtonGroup>
    </>
  );
};

export default EditorButtons;
