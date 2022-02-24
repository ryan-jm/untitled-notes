# Note List Card Guidelines

The note list card is what each `<li>` element should consist of – it is essentially a box which holds the `note title` with quality of life features for the user to delete their notes with.

### States:

#### Normal

![note-card](../images/note-card.png)

#### Swiped/dragged

![note-card-delete](../images/note-card-delete.png)

When swiped left, the note card displays a small red box with an icon within it to demonstrate the user can delete their note. Upon tapping the `red div`, the card is popped off the array of notes and then the database is instructed to delete the corresponding note.
