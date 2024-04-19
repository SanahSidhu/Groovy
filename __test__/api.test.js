const axios = require('axios');

jest.mock('axios');

const {fetchRecords } = require('../routes/api'); 


describe('fetchRecords', () => {
    it('Fetch records successfully from Discogs API', async () => {

      const mockData = { results: [{id: 1, title: "Artist1 - Record1", thumb: "thumb1.png"}], pagination: {
        pages: 3, 
        page: 2
    }};

    const expectedResults = {
      results: [
        {
          id: 1, 
          title: "Record1", 
          artist: "Artist1", 
          thumb: "thumb1.png"
        }
      ],
      pagination: mockData.pagination
    };

      axios.get.mockResolvedValue({ data: mockData });
  
      const result = await fetchRecords();
  
      expect(axios.get).toHaveBeenCalled();
      expect(result).toEqual(expectedResults);
    });
  
    it('Return null if fetch records is unsuccessful', async () => {
        
      axios.get.mockRejectedValue(new Error('API Error'));
  
      const result = await fetchRecords();
  
      expect(axios.get).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });