# Create Note Page

![create-note-page](../images/create-note-page.png)

## Custom components needed:

- Navbar
- Markdown Editor
- Note List

## Chakra components needed:

- Button
- ButtonGroup
- Grid
- GridItem

_...Probably some others_

## Key points:

- The `Note List` should display the entire collection of the user's stored notes. It should be ordered by creation date, and the one which the user is currently viewing should be stored at the top, with the `iris` colour to make it stand out from the rest.

- Each entry in the `Note List` component should be able to be swiped upon (from right-to-left) to delete the note, similar to iOS – when the note is deleted, it is then removed from the database with optimistic rendering.

- The `first` line on the markdown editor should be defaulted to the title of the note; with an enforced `H1` on whatever text is entered.

- There should be a `plus-icon` icon button at the top of the `Note List` component which allows a user to create a new note by saving the current state of the editor to the database, and then wiping it clear.
