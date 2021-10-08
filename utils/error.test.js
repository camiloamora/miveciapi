const Error = require('./error');

describe('Custom error', () => {
    it('When assign error server 500 should return this code', () => {
        const codeServer500 = 500;
        const basicError = "Error basic";
        const result = Error(basicError, codeServer500);
        expect(codeServer500).toEqual(result.statusCode);
    })

    it('Return personalized message error', () => {
        const result = Error("Error custom", 500);
        const assert = new Error("Error custom");
        expect(assert).toEqual(result);
    })
})
