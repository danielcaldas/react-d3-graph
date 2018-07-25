import * as linkHelper from '../../../src/components/link/link.helper';

describe('Link Helper', () => {
    describe('#buildLinkPathDefinition', () => {
        test('should return expected path definition', () => {
            const path = linkHelper.buildLinkPathDefinition({ source: { x: '1', y: '2' }, target: { x: '3', y: '4' } });

            expect(path).toEqual('M1,2A0,0 0 0,1 3,4');
        });
    });
});
