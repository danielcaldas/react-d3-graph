import Utils from '../src/utils';

test('merge 2 objects', () => {
  const o = Utils.merge({a: 1, b:2}, {b:3, d:4});

  expect(o).toEqual({a:1,b:3});
});

import React from 'react';
import {shallow} from 'enzyme';
import Link from '../src/components/Link';

test('Link sample', () => {
    const mockCallback = jest.fn();
    const link = shallow(
        <Link x1='2' y1='2' x2='4' y2='4' opacity='1' stroke='red' strokeWidth='2' onClickLink={mockCallback}/>
    );
    link.instance().handleOnClickLink();
    expect(mockCallback).toBeCalled();
});

test('isObjectEmpty', () => {
    expect(Utils.isObjectEmpty({ a: 1, b: {}})).toBe(false);
    expect(Utils.isObjectEmpty({ a: 1 })).toBe(false);
    expect(Utils.isObjectEmpty(null)).toBe(false);
    expect(Utils.isObjectEmpty(undefined)).toBe(false);
    expect(Utils.isObjectEmpty(0)).toBe(false);
    expect(Utils.isObjectEmpty('test')).toBe(false);
    expect(Utils.isObjectEmpty({})).toBe(true);
});

test('isObjectEqual', () => {
    const o1 = {
        a:1,
        b:{
            c:{
                d: false,
                e: 'test',
                f: 12
            },
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

    const o2 = {
        a:1,
        b:{
            c:{
                d: false,
                e: 'test',
                f: 12
            },
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

    expect(Utils.isEqual(o1, o2)).toBe(true);

    o2.b.j.k = undefined;
    expect(Utils.isEqual(o1, o2)).toBe(false);
    o2.b.j.k = null;

    o2.b.j.m.n.o = '1';
    expect(Utils.isEqual(o1, o2)).toBe(false);
    o2.b.j.m.n.o = 1;

    o2.b.c.e = 'tests';
    expect(Utils.isEqual(o1, o2)).toBe(false);
    o2.b.c.e = 'test';

    o1.b.i = false;
    expect(Utils.isEqual(o1, o2)).toBe(false);
    o1.b.i = {};

    expect(Utils.isEqual(o1, o2)).toBe(true);

    o1.a = false;
    expect(Utils.isEqual(o1, o2)).toBe(false);
    o1.a = 1;

    o2.b.g = 'tests';
    expect(Utils.isEqual(o1, o2)).toBe(false);
});
