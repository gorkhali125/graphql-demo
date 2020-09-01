# GraphQL Demo

GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.

## Usage

Clone the repository locally. Navigate to the directory and run

```
npm install
```

and afterwards

```
npm start
```

## Models

A simple Note model is added for the demo purpose with the following attributes:
 - title
 - description
 - status
 - date

This model can be used by GraphQL to add a new note as well as query the note. We will have a look at this in the specific Mutation (Adding a new Note) and Query (Querying the note data) sections below.


## User Interface

The system should be up and running at this point. Open a browser window and navigate to http://localhost:3200. This page is not useful for now. For GraphQL interface, go to http://localhost:3200/graphql


## Mutation

Mutation in GraphQL modifies data in the data store and returns some value. We can use mutations to insert, update or delete the data.

Add this code below in the graphql UI and then run it:

```
mutation{
  createNote(noteInput:{
    title: "Test Note",
    description: "Test Description",
    status: 1,
    date: "2020-09-01T14:18:05.592Z"
  }){
    title
    description
  }
}
```

You will see that it inserts the data in the mongo database and returns us only the title and description fields a we needed.

```
{
  "data": {
    "createNote": {
      "title": "Test Note",
      "description": "Test Description"
    }
  }
}
```

Try to add a few notes using this mutation in the GraphQL UI.


## Query

Query in GraphQL selects or retrieves the data from the data store. We can only fetch the required data that we need instead of fetching all the data in the store.

Add this code below in the graphql UI and then run it:

```
query{
  notes{
    title
  }
}
```

You will see that this will return only the title of all the notes that you have added using the mutations above. Try another query and check the output yourself.

```
query{
  notes{
    title
    description
    date
  }
}
```
This outputs the result as shown below

```
{
  "data": {
    "notes": [
      {
        "title": "Test Note",
        "description": "Test Description",
        "date": "1598969885592"
      },
      {
        "title": "Test Note 2 ",
        "description": "Test Description 2",
        "date": "1598971369362"
      },
      {
        "title": "Test Note 3",
        "description": "Test Description 3",
        "date": "1598971382987"
      }
    ]
  }
}
```


