# blog-project

ENDPOINTS: 

To get all entries by one author (by author email):
[urlBase]entries/:author/:limit/:skip

Obligatory parameters:
:author - author email
:limit - results per page 
:skip - number of results skipped before first shown result 


To get all results, from all authors:
[urlBase]/all-entries/:limit/:skip

Obligatory parameters:
:limit - results per page 
:skip - number of results skipped before first shown result 

To get one article by title and author:
[urlBase]/entry/:title/:author 

Obligatory parameters:
:title - title of article
:author - author email

To search all results (all authors) using search term/ key word:
[urlBase]/search/:search/:limit/:skip

Obligatory parameters:
:search - search key word 
:limit - results per page 
:skip - number of results skipped before first shown result 
