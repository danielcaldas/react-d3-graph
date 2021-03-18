import * as utils from "../src/utils";

describe("Utils", () => {
  describe("#merge", () => {
    let that = {};

    beforeEach(() => {
      that.o = {
        a: 1,
        b: {
          c: { d: [1, 2, { m: "test" }], e: "test", f: 12 },
          j: {
            k: null,
            l: "test",
          },
        },
      };
    });

    test("should merge properly: r.a should be 2 and r.b.c.d should true", () => {
      const r = utils.merge(that.o, { a: 2, b: { c: { d: [1, 2, { m: "override" }] } } });

      expect(r.a).toEqual(2);
      expect(r.b.c.e).toEqual("test");
      expect(r.b.c.f).toEqual(12);
      expect(r.b.c.d).toEqual([1, 2, { m: "override" }]);
    });

    test("should merge properly: o2 is undefined", () => {
      const r = utils.merge(that.o, undefined);

      expect(r.a).toEqual(1);
      expect(r.b.c.d).toEqual([1, 2, { m: "test" }]);
      expect(r.b.c.e).toEqual("test");
      expect(r.b.c.f).toEqual(12);
    });

    test("should merge properly: o1 is null", () => {
      const r = utils.merge(null, that.o);

      expect(r.a).toEqual(1);
      expect(r.b.c.d).toEqual([1, 2, { m: "test" }]);
      expect(r.b.c.e).toEqual("test");
      expect(r.b.c.f).toEqual(12);
    });
  });

  describe("#isEmptyObject", () => {
    test("should properly check whether the object is empty or not", () => {
      expect(utils.isEmptyObject({ a: 1, b: {} })).toEqual(false);
      expect(utils.isEmptyObject({ a: 1 })).toEqual(false);
      expect(utils.isEmptyObject(null)).toEqual(false);
      expect(utils.isEmptyObject(undefined)).toEqual(false);
      expect(utils.isEmptyObject(0)).toEqual(false);
      expect(utils.isEmptyObject("test")).toEqual(false);
      expect(utils.isEmptyObject({})).toEqual(true);
    });
  });

  describe("#isNil", () => {
    test("should return true for null or undefined", () => {
      expect(utils.isNil(undefined)).toEqual(true);
      expect(utils.isNil()).toEqual(true);
      expect(utils.isNil(null)).toEqual(true);
      expect(utils.isNil(NaN)).toEqual(false);
    });
  });

  describe("#isDeepEqual", () => {
    let that = {};

    beforeEach(() => {
      that.o1 = {
        a: 1,
        b: {
          c: { d: false, e: "test", f: 12 },
          g: "test",
          h: undefined,
          i: {},
          j: {
            k: null,
            l: "test",
            m: {
              n: {
                o: 1,
              },
              p: [{ x: 1 }, { y: 2 }],
            },
          },
        },
      };

      that.o2 = {
        a: 1,
        b: {
          c: { d: false, e: "test", f: 12 },
          g: "test",
          h: undefined,
          i: {},
          j: {
            k: null,
            l: "test",
            m: {
              n: {
                o: 1,
              },
              p: [{ x: 1 }, { y: 2 }],
            },
          },
        },
      };
    });

    test("should return true if o1 and o2 references are the same", () => {
      const o1 = {};
      const o2 = o1;

      expect(utils.isDeepEqual(o1, o2)).toEqual(true);
    });

    test("should return true if no modifications are performed", () => {
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(true);
    });

    test("should return false when o2 is an empty object but o1 is not", () => {
      expect(utils.isDeepEqual(that.o1, {})).toEqual(false);
    });

    test("should return false when o1 is an empty object but o2 is not", () => {
      expect(utils.isDeepEqual({}, that.o2)).toEqual(false);
    });

    test("should return true when both objects are empty", () => {
      expect(utils.isDeepEqual({}, {})).toEqual(true);
    });

    test("should return false when: o2.b.j.k = undefined", () => {
      that.o2.b.j.k = undefined;
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return false when: o2.b.j.m.n.o = '1'", () => {
      that.o2.b.j.m.n.o = "1";
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return false when: o2.b.c.e = 'tests'", () => {
      that.o2.b.c.e = "tests";
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return false when: o1.b.i = false", () => {
      that.o1.b.i = false;
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return false when: o1.a = false", () => {
      that.o1.a = false;
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return false when: o2.b.g = 'tests'", () => {
      that.o2.b.g = "tests";
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return true when: o1.b.g = o2.b and o2.b.g = o2.b (circular structure)", () => {
      // isDeepEqual will evaluate until certain depth
      // but since objects still the same we expect the result to be true
      that.o1.b.g = that.o2.b;
      that.o2.b.g = that.o2.b;
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(true);
    });

    test("should return true when: o1.b.g = o2.b and o2.b.g = o2 (circular structure)", () => {
      that.o1.b.g = that.o2.b;
      that.o2.b.g = that.o2;
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return true when o1.b.g and o2.b.g are arrays with the same elements", () => {
      that.o1.b.g = [1, 2, 3];
      that.o2.b.g = [1, 2, 3];
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(true);
    });

    test("should return false when o1.b.g and o2.b.g are arrays with the different elements", () => {
      that.o1.b.g = [1, 2, "3"];
      that.o2.b.g = [1, 2, 3];
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return false when o1.a.b.c and o2.a.b.c are objects with different number of properties", () => {
      that.o2.b.c = { d: false, e: "test", f: 12, ff: false };
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });

    test("should return false when o1.b.j.m.p array's first object has different x value ", () => {
      that.o1.b.j.m.p[0].x = 9000;
      expect(utils.isDeepEqual(that.o1, that.o2)).toEqual(false);
    });
  });

  describe("#deepClone", () => {
    let that = {};

    beforeEach(() => {
      that.o = {
        a: 1,
        b: {
          j: {
            k: null,
            l: "test",
          },
        },
        c: "test",
        f: 0,
      };
    });

    test("should properly clone a given object", () => {
      const clone = utils.deepClone(that.o);

      expect(clone).toEqual(that.o);
      expect(clone).not.toBe(that.o);
      expect(clone.b).not.toBe(that.o.b);
      expect(clone.b.j).not.toBe(that.o.b.j);
    });
  });

  describe("#pick", () => {
    let that = {};

    beforeEach(() => {
      that.o = {
        a: 1,
        b: {
          j: {
            k: null,
            l: "test",
          },
        },
        c: "test",
        f: 0,
      };
    });

    test("should pick given props and return expected object", () => {
      const result = utils.pick(that.o, ["a", "f", "not a o prop"]);

      expect(result).toEqual({ a: 1, f: 0 });
    });
  });

  describe("#antiPick", () => {
    let that = {};

    beforeEach(() => {
      that.o = {
        a: 1,
        b: {
          j: {
            k: null,
            l: "test",
          },
        },
        c: "test",
        f: 0,
      };
    });

    test("should pick given props and return expected object", () => {
      const result = utils.antiPick(that.o, ["a", "f", "not a o prop"]);

      expect(result).toEqual({
        b: {
          j: {
            k: null,
            l: "test",
          },
        },
        c: "test",
      });
    });
  });

  describe("#throwErr", () => {
    test("should throw error", () => {
      const c = "some component";
      const msg = "err message";

      try {
        utils.throwErr(c, msg);
      } catch (err) {
        expect(err.message).toEqual("react-d3-graph :: some component :: err message");
      }
    });
  });
});
