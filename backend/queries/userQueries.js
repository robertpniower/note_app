// SQL query used to find a user by their email address

export const findUserByEmailQuery = `
SELECT
id,
name,
email,
password_hash,
created_at,
updated_at
FROM users
WHERE email = $1;
`;

// SQL query used to find a user by their database ID.

export const findUserByIdQuery = `
SELECT
id,
name,
email.
created_at,
updated_at
FROM users
WHERE id = $1;
`;

// SQL query used to create a new user.

export const createUserQuery = `
INSET into users (
name,
email,
password_hash
)
VALUES ($!, $2, $3)
RETURNING
id,
    name,
    email,
    created_at,
    updated_at;
    `;
