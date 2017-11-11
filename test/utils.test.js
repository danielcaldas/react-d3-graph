import utils from '../src/utils';

describe('Utils', () => {
    describe('merge', () => {
        let that = {};

        beforeEach(() => {
            that.o = {
                a:1,
                b:{
                    c:{ d: [1, 2, {m: 'test'}], e: 'test', f: 12 },
                    j: {
                        k: null,
                        l: 'test',
                    }
                }
            };
        });

        test('should merge properly: r.a should be 2 and r.b.c.d should true', () => {
            const r = utils.merge(that.o, { a:2, b: { c: { d: [1, 2, {m: 'override'}] } } });

            expect(r.a).toEqual(2);
            expect(r.b.c.e).toEqual('test');
            expect(r.b.c.f).toEqual(12);
            expect(r.b.c.d).toEqual([1, 2, {m: 'override'}]);
        });

        test('should merge properly: o2 is undefined', () => {
            const r = utils.merge(that.o, undefined);

            expect(r.a).toEqual(1);
            expect(r.b.c.d).toEqual([1, 2, {m: 'test'}]);
            expect(r.b.c.e).toEqual('test');
            expect(r.b.c.f).toEqual(12);
        });
    });

    test('isObjectEmpty', () => {
        expect(utils.isObjectEmpty({ a: 1, b: {}})).toEqual(false);
        expect(utils.isObjectEmpty({ a: 1 })).toEqual(false);
        expect(utils.isObjectEmpty(null)).toEqual(false);
        expect(utils.isObjectEmpty(undefined)).toEqual(false);
        expect(utils.isObjectEmpty(0)).toEqual(false);
        expect(utils.isObjectEmpty('test')).toEqual(false);
        expect(utils.isObjectEmpty({})).toEqual(true);
    });

    describe('isDeepEqual', () => {
        let that = {};

        beforeEach(() => {
            that.o1 = {
                a:1,
                b:{
                    c:{ d: false, e: 'test', f: 12 },
                    g: 'test',
                    h: undefined,
                    i: {},
                    j: {
                        k: null,
                        l: 'test',
                        m: {
                            n: {
                                o: 1
                            }
                        }
                    }
                }
            };

            that.o2 = {
                a:1,
                b:{
                    c:{ d: false, e: 'test', f: 12 },
                    g: 'test',
                    h: undefined,
                    i: {},
                    j: {
                        k: null,
                        l: 'test',
                        m: {
                            n: {
                                o: 1
                            }
                        }
                    }
                }
            };
        });

        test('should return true if o1 and o2 references are the same', () => {
            const o1 = {};
            const o2 = o1;

            expect(utils.isDeepEqual(o1, o2)).toEqual(true);
        });

        test('should return true if no modifications are performed', () => {
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(true);
        });

        test('should return false when o2 is an empty object but o1 is not', () => {
            expect(utils.isDeepEqual(that.o1, {})).toEqual(false);
        });

        test('should return false when o1 is an empty object but o2 is not', () => {
            expect(utils.isDeepEqual({}, that.o2)).toEqual(false);
        });

        test('should return true when both objects are empty', () => {
            expect(utils.isDeepEqual({}, {})).toEqual(true);
        });

        test('should return false when: o2.b.j.k = undefined', () => {
            that.o2.b.j.k = undefined;
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o2.b.j.m.n.o = "1"', () => {
            that.o2.b.j.m.n.o = '1';
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o2.b.c.e = "tests"', () => {
            that.o2.b.c.e = 'tests';
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o1.b.i = false', () => {
            that.o1.b.i = false;
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o1.a = false', () => {
            that.o1.a = false;
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o2.b.g = "tests"', () => {
            that.o2.b.g = 'tests';
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return true when: o1.b.g = o2.b and o2.b.g = o2.b (circular structure)', () => {
            // isDeepEqual will evaluate until certain depth
            // but since objects still the same we expect the result to be true
            that.o1.b.g = that.o2.b;
            that.o2.b.g = that.o2.b;
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(true);
        });

        test('should return true when: o1.b.g = o2.b and o2.b.g = o2 (circular structure)', () => {
            that.o1.b.g = that.o2.b;
            that.o2.b.g = that.o2;
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return true when o1.b.g and o2.b.g are arrays with the same elements', () => {
            that.o1.b.g = [1, 2, 3];
            that.o2.b.g = [1, 2, 3];
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(true);
        });

        test('should return false when o1.b.g and o2.b.g are arrays with the different elements', () => {
            that.o1.b.g = [1, 2, '3'];
            that.o2.b.g = [1, 2, 3];
            expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
        });
    });
});
