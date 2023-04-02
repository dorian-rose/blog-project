const queries = {
        getAllEntries:
                `SELECT e.title, e.image, e.date, e.content
            FROM entries AS e
            INNER JOIN authors AS a
            ON e.email = a.email
            WHERE a.email = $1
            ORDER BY e.title
            LIMIT $2
            OFFSET $3`,
        getEntry: `SELECT e.title, e.image, e.date, e.content
            FROM entries AS e
            INNER JOIN authors AS a
            ON e.email = a.email
            WHERE a.email = $1 and e.title = $2`,
        createEntry: `INSERT INTO entries(title,content,extract, image, email, category)
            VALUES 
            ($1, $2, $3, $4, $5, $6)`,
        updateEntries: `UPDATE entries
            SET title=$1, content=$2, extract=$3, image=$4, email=$5, category=$6
            WHERE title=$7 AND email=$5`,
        deleteEntries: `DELETE 
           FROM entries 
           WHERE title=$1 AND email=$2`,
        searchEntries: `SELECT e.title, e.image, e.date, e.extract
            FROM entries AS e
            INNER JOIN authors AS a
            ON e.email = a.email
            WHERE a.email = $1 AND e.title LIKE $2 OR a.email = $1 AND e.content LIKE $2
            LIMIT $3
            OFFSET $4`,
}

module.exports = queries;