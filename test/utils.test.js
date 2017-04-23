import Utils from '../src/utils';

describe('Utils', () => {
    describe('merge', () => {
        let that = {};

        beforeEach(() => {
            that.o = {
                a:1,
                b:{
                    c:{ d: false, e: 'test', f: 12 },
                    j: {
                        k: null,
                        l: 'test',
                    }
                }
            };
        });

        test('should merge properly: r.a should be 2 and r.b.c.d should true', () => {
            const r = Utils.merge(that.o, { a:2, b: { c: { d: true } } });

            expect(r.a).toEqual(2);
            expect(r.b.c.d).toEqual(true);
            expect(r.b.c.e).toEqual('test');
            expect(r.b.c.f).toEqual(12);
        });

        test('should merge properly: o2 is undefined', () => {
            const r = Utils.merge(that.o, undefined);

            expect(r.a).toEqual(1);
            expect(r.b.c.d).toEqual(false);
            expect(r.b.c.e).toEqual('test');
            expect(r.b.c.f).toEqual(12);
        });
    });

    test('isObjectEmpty', () => {
        expect(Utils.isObjectEmpty({ a: 1, b: {}})).toEqual(false);
        expect(Utils.isObjectEmpty({ a: 1 })).toEqual(false);
        expect(Utils.isObjectEmpty(null)).toEqual(false);
        expect(Utils.isObjectEmpty(undefined)).toEqual(false);
        expect(Utils.isObjectEmpty(0)).toEqual(false);
        expect(Utils.isObjectEmpty('test')).toEqual(false);
        expect(Utils.isObjectEmpty({})).toEqual(true);
    });

    describe('isEqual', () => {
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

        test('should return true if no modifications are performed', () => {
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(true);
        });

        test('should return false when o2 is an empty object but o1 is not', () => {
            expect(Utils.isEqual(that.o1, {})).toEqual(false);
        });

        test('should return false when o1 is an empty object but o2 is not', () => {
            expect(Utils.isEqual({}, that.o2)).toEqual(false);
        });

        test('should return true when both objects are empty', () => {
            expect(Utils.isEqual({}, {})).toEqual(true);
        });

        test('should return false when: o2.b.j.k = undefined', () => {
            that.o2.b.j.k = undefined;
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o2.b.j.m.n.o = "1"', () => {
            that.o2.b.j.m.n.o = '1';
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o2.b.c.e = "tests"', () => {
            that.o2.b.c.e = 'tests';
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o1.b.i = false', () => {
            that.o1.b.i = false;
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o1.a = false', () => {
            that.o1.a = false;
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return false when: o2.b.g = "tests"', () => {
            that.o2.b.g = 'tests';
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(false);
        });

        test('should return true when: o1.b.g = o2.b and o2.b.g = o2.b (circular structure)', () => {
            // isEqual will evaluate until certain depth
            // but since objects still the same we expect the result to be true
            that.o1.b.g = that.o2.b;
            that.o2.b.g = that.o2.b;
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(true);
        });

        test('should return true when: o1.b.g = o2.b and o2.b.g = o2 (circular structure)', () => {
            that.o1.b.g = that.o2.b;
            that.o2.b.g = that.o2;
            expect(Utils.isEqual(that.o1, that.o2)).toEqual(false);
        });
    });
});
