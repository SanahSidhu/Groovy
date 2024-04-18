const {JSDOM} = require("jsdom");
const path = require("path");
const ejs = require("ejs");

describe('Index rendering', () => {

    test('Rendr index.ejs with required elements', done => {
        
        ejs.renderFile(path.join(__dirname, '../views/index.ejs'), {}, (err, html) => {
            
            if (err) return done(err);
            
            const dom = new JSDOM(html);
            const document = dom.window.document;

            expect(document.querySelector('.flex-container')).not.toBeNull();
            expect(document.querySelector('.btn')).not.toBeNull();
            done();
        });
    });
});


describe('Discover Page rendering', () => {

    test('Render correctly if records are available', done => {

        const mockData = {
            records: [
                {id: 1, title: "Record1" ,artist: "Artist1", thumb: "thumb1.png"},
                {id: 2, title: "Record2" ,artist: "Artist2", thumb: "thumb2.png"}
            ], 
            pagination: {
                pages: 3, 
                page: 2
            }
        };

        ejs.renderFile(path.join(__dirname, '../views/discover.ejs'), mockData, (err, html) => {
            
            if (err) return done(err);

            const dom = new JSDOM(html);
            const document = dom.window.document;

            const cards = document.querySelectorAll('.record-card');
            expect(cards.length).toBe(2);
            expect(document.querySelector('.card-title').textContent).toContain("Record1");
            expect(document.querySelector('.page-link').textContent).toContain("Prev");
            done();

        });
    });


    test('Display No records found, if not records are available.', done=> {
        const mockData = {
            records: [],
            pagination: {
                pages: 0, 
                page: 1
            }
        };

        ejs.renderFile(path.join(__dirname,'../views/discover.ejs'), mockData,(err, html) => {
            if (err) return done(err);

            const dom = new JSDOM(html);
            const document = dom.window.document;

            expect(document.querySelector('.card-container')).toBeNull();
            expect(document.body.textContent).toContain("No records found!");
            done();
        });
    });

});