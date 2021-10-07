const Error = require('../utils/error');

describe('Validate utils operations', () => {
    it('Return personalized code error', () => {
        const result = Error("Error basic", 500);
        expect(500).toEqual(result.statusCode);
    })

    it('Return personalized message error', () => {
        const result = Error("Error custom", 500);
        const assert = new Error("Error custom");
        expect(assert).toEqual(result);
    })
})