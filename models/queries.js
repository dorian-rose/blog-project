const queries = {
        getAllAuthEntries:
                `SELECT e.title, e.image, e.date, e.content
            FROM entries AS e
            INNER JOIN authors AS a
            ON e.email = a.email
            WHERE a.email = $1
            ORDER BY e.title
            LIMIT $2
            OFFSET $3`,
        getAllEntries:
                `SELECT title, image, date, content
            FROM entries 
            ORDER BY title
            LIMIT $1
            OFFSET $2`,
        getEntry: `SELECT e.title, e.image, e.date, e.content
            FROM entries AS e
            INNER JOIN authors AS a
            ON e.email = a.email
            WHERE e.title = $1 and e.email = $2`,
        createEntry: `INSERT INTO entries(title,content,extract, image, email, category)
            VALUES 
            ($1, $2, $3, $4, $5, $6)`,
        updateEntries: `UPDATE entries
            SET title=$1, content=$2, extract=$3, image=$4, email=$5, category=$6
            WHERE title=$7 AND email=$5`,
        deleteEntries: `DELETE 
           FROM entries 
           WHERE title=$1 AND email=$2`,
        searchEntries: `SELECT title, image, date, extract
            FROM entries
            WHERE  title LIKE $1 OR content LIKE $1
            LIMIT $2
            OFFSET $3`,
}

module.exports = queries;