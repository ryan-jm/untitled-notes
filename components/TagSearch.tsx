import { Flex, Button, Heading } from '@chakra-ui/react';

export default function TagSearch(props) {
  const { tagsArray, setTagFilter } = props;

  function createTag(tag) {
    return (
      <Button
        key={tag}
        onClick={handleTag}
        m="3px"
        variant={'cardTagsButton'}
        size={'sm'}
        w={'min-content'}
        value={tag}
      >
        {tag}
      </Button>
    );
  }

  function handleTag(event) {
    setTagFilter(() => event.target.value);
  }

  return (
    <>
      <Heading size={'sm'}>Tag filter: </Heading>
      <Flex justifyContent={'center'} flexDirection={'row'} flexWrap={'wrap'}>
        <Button
          key={'all'}
          onClick={() => setTagFilter(() => '')}
          m="3px"
          variant={'cardTagsButton'}
          size={'sm'}
          w={'min-content'}
        >
          No Filter
        </Button>
        {tagsArray.map((tag) => createTag(tag))}
      </Flex>
    </>
  );
}
