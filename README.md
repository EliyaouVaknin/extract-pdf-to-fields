extract field from resume pdf file and store data over mongoDB.

Getting Started :
  1. Make sure that you have installed node.js on your pc.
  2. Clone the repository (https://github.com/EliyaouVaknin/extract-pdf-to-fields.git);
  3. In the CLI run "node index.js"
  4. In your browser enter url "http://localhost:3001/"
  5. Upload a pdf file.
  6. Click on "Search" button - the result from the server will appear in the textarea element.
  7. 
Make sure that the db connect properly, maybe you will need to change ports.

All dependencies should be in the node_modules folder but if you have issue during running
the app try to re-install: express, express-fileupload, body-parser, mongoose and pdf-parse npm's.
