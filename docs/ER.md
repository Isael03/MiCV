erDiagram

PROJECT {
    string id
    string title
    string fontFamily
    string template
    datetime createdAt
    datetime updatedAt
}

PERSONAL_INFO {
    string id
    string projectId
    string firstName
    string lastName
    string email
    string phone
    string address
    string linkedin
    string website
    string photoPath
}

ABOUT {
    string id
    string projectId
    text description
}

EDUCATION {
    string id
    string projectId
    string institution
    string degree
    date startDate
    date endDate
    text description
}

EXPERIENCE {
    string id
    string projectId
    string company
    string position
    date startDate
    date endDate
    text description
}

SKILL {
    string id
    string projectId
    string name
    string level
}

LANGUAGE {
    string id
    string projectId
    string name
    string level
}

PROJECT_ITEM {
    string id
    string projectId
    string title
    text description
    string link
}

PROJECT ||--|| PERSONAL_INFO : has
PROJECT ||--|| ABOUT : has
PROJECT ||--o{ EDUCATION : contains
PROJECT ||--o{ EXPERIENCE : contains
PROJECT ||--o{ SKILL : contains
PROJECT ||--o{ LANGUAGE : contains
PROJECT ||--o{ PROJECT_ITEM : contains