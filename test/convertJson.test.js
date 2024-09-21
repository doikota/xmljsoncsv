import { recursiveExtract } from '../src/convertJson';

describe('recursiveExtract', () => {

  it('should extract fields from a flat JSON object', () => {
    const fieldNames = {};
    const item = { name: 'John', age: 30, city: 'New York' };

    recursiveExtract(fieldNames, item);

    const expectedFieldNames = {
      name: null,
      age: null,
      city: null,
    };

    expect(fieldNames).toEqual(expectedFieldNames);
  });

  it('should extract fields from a nested JSON object', () => {
    const fieldNames = {};
    const item = { name: 'John', address: { city: 'New York', zip: '10001' } };

    recursiveExtract(fieldNames, item);

    const expectedFieldNames = {
      name: null,
      'address.city': null,
      'address.zip': null,
    };

    expect(fieldNames).toEqual(expectedFieldNames);
  });

  it('should extract fields from a JSON object with arrays', () => {
    const fieldNames = {};
    const item = { name: 'John', hobbies: ['reading', 'swimming'] };

    recursiveExtract(fieldNames, item);

    const expectedFieldNames = {
      name: null,
      'hobbies.0': null,
      'hobbies.1': null,
    };

    expect(fieldNames).toEqual(expectedFieldNames);
  });

  it('should extract fields from a complex nested JSON object with arrays', () => {
    const fieldNames = {};
    const item = {
      name: 'John',
      address: { city: 'New York', zip: '10001' },
      hobbies: ['reading', { type: 'sport', name: 'swimming' }],
    };

    recursiveExtract(fieldNames, item);

    const expectedFieldNames = {
      name: null,
      'address.city': null,
      'address.zip': null,
      'hobbies.0': null,
      'hobbies.1.type': null,
      'hobbies.1.name': null,
    };

    expect(fieldNames).toEqual(expectedFieldNames);
  });

  it('should handle empty objects', () => {
    const fieldNames = {};
    const item = {};

    recursiveExtract(fieldNames, item);

    const expectedFieldNames = {};

    expect(fieldNames).toEqual(expectedFieldNames);
  });

  it('should handle null values', () => {
    const fieldNames = {};
    const item = { name: 'John', age: null };

    recursiveExtract(fieldNames, item);

    const expectedFieldNames = {
      name: null,
      age: null,
    };

    expect(fieldNames).toEqual(expectedFieldNames);
  });
});
