import {
  Heading,
  Link,
  Box,
  Center,
  HStack,
  Grid,
  GridItem,
  Flex,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';

import { EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';

export default function NoteCard(note) {
  const { title, content, created_at, tags } = note.note;

  console.log(tags);

  return (
    <Center p={6}>
      <Box
        maxW={'270px'}
        w={'270px'}
        h={'350px'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'5px 8px 12px #7879F1'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Grid h="100%" templateColumns="1" templateRows={'repeat(4, 1fr)'} p={4} position="relative">
          <GridItem>
            <Box p="" position="absolute" left="15px" top="15px">
              <IconButton aria-label="Edit note" size="sm" variant={'cardEditButton'} icon={<EditIcon />} />
            </Box>

            <Box p="" position="absolute" right="15px" top="15px">
              <IconButton aria-label="Delete note" size="sm" variant={'cardDeleteButton'} icon={<DeleteIcon />} />
            </Box>

            <Stack spacing={0} align={'center'} mb={5}>
              <Heading mt="20px" pb="15px" fontSize={'2xl'}>
                {title}
              </Heading>
            </Stack>
          </GridItem>

          <GridItem>
            <Text noOfLines={4} color={'gray.500'}>
              {content}
            </Text>
          </GridItem>

          <GridItem w="230px" rowStart={4}>
            <HStack>
              <Flex>
                <Popover>
                  <PopoverTrigger>
                    <IconButton aria-label={'stuff'} size="xs" variant={'cardTagsButton'} icon={<ChevronDownIcon />} />
                  </PopoverTrigger>

                  <PopoverContent w="250px">
                    <PopoverArrow />
                    <Box textAlign={'center'}>
                      <PopoverBody>
                        {tags.map((tag) => {
                          return <Link key={tag}>{tag}&nbsp;</Link>;
                        })}
                      </PopoverBody>
                    </Box>
                  </PopoverContent>
                </Popover>
              </Flex>

              <Flex noOfLines={1}>
                {tags.map((tag) => {
                  return <Link key={tag}>{tag}&nbsp;</Link>;
                })}
              </Flex>
            </HStack>

            <Grid pt="10px" noOfLines={3} templateColumns="">
              <Text fontSize={'sm'}>Date: {created_at}</Text>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
}
