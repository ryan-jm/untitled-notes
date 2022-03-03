import { useCommands } from '@remirror/react';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  IconButton,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { useNoteContext } from '@/contexts/NoteContext';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BiUndo, BiRedo, BiBroadcast } from 'react-icons/bi';
import { useEffect, useState } from 'react';

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

const UndoButton = () => {
  const commands = useCommands();
  return (
    <Tooltip label="Undo | Ctrl + Z">
      <IconButton
        aria-label="Undo"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.undo()}
        icon={<BiUndo />}
      />
      {/* <ChevronLeftIcon /> */}
    </Tooltip>
  );
};

const RedoButton = () => {
  const commands = useCommands();
  return (
    <Tooltip label="Redo | Ctrl + Shift + Z">
      <IconButton
        aria-label="Redo"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.redo()}
        icon={<BiRedo />}
      />
    </Tooltip>
  );
};

const CollaborateButton = (props) => {
  const { currentNote } = useNoteContext();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (currentNote?.noteId && disabled) {
      setDisabled(false);
    }
  }, [currentNote, disabled]);

  return (
    <Tooltip label="Create live session and collaborate with friends">
      <IconButton
        disabled={disabled}
        aria-label="Create Live Collaboration Session"
        icon={<BiBroadcast />}
        onClick={() => props.setShowModal(true)}
      />
    </Tooltip>
  );
};

const EditorButtons = (props) => {
  return (
    <Flex align="center" justify="center">
      <HStack spacing={2}>
        <ButtonGroup size="sm" isAttached variant="toolbar">
          <BoldButton />
          <ItalicButton />
        </ButtonGroup>

        <ButtonGroup size="sm" isAttached variant="toolbar">
          <HeadingButtons />
        </ButtonGroup>

        <ButtonGroup size="sm" isAttached variant="toolbar">
          <BlockquoteButton />
        </ButtonGroup>

        <ButtonGroup size="sm" isAttached variant="toolbar">
          <UndoButton />
          <RedoButton />
        </ButtonGroup>
        {!props.session ? (
          <ButtonGroup size="sm" variant="toolbar">
            <CollaborateButton {...props} />
          </ButtonGroup>
        ) : (
          <></>
        )}
      </HStack>
    </Flex>
  );
};

export default EditorButtons;
