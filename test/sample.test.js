import Utils from '../src/utils';

test('merge 2 objects', () => {
  const o = Utils.merge({a: 1, b:2}, {b:3, d:4});

  expect(o).toEqual({a:1,b:3});
});

import React from 'react';
import {shallow} from 'enzyme';
import Link from '../src/components/Link';

test.skip('Link sample', () => {
    const mockCallback = jest.fn();
    const link = shallow(
        <Link x1='2' y1='2' x2='4' y2='4' opacity='1' stroke='red' strokeWidth='2' onClickLink={mockCallback}/>
    );
    link.instance().handleOnClickLink();
    expect(mockCallback).toBeCalled();
});

test.skip('isObjectEmpty', () => {
    expect(Utils.isObjectEmpty({ a: 1, b: 2})).toBe(false);

    expect(Utils.isObjectEmpty({})).toBe(true);
});

test.only('isObjectEqual', () => {
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
                l: 'test'
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
                l: 'test'
            }
        }
    };

    // expect(Utils.compareObjects(o1, o2)).toBe(true);
    //
    o2.b.j.k = undefined;
    expect(Utils.compareObjects(o1, o2)).toBe(false);
    o2.b.j.k = null;


    // o2.b.c.e = 'tests';
    // expect(Utils.compareObjects(o1, o2)).toBe(false);
    // o2.b.c.e = 'test';
    //
    // o1.b.i = false;
    // expect(Utils.compareObjects(o1, o2)).toBe(false);
    // o1.b.i = {};
    //
    // expect(Utils.compareObjects(o1, o2)).toBe(true);
    //
    // o1.a = false;
    // expect(Utils.compareObjects(o1, o2)).toBe(false);
    // o1.a = 1;
});
/*

import React from 'react';
import {shallow} from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  );

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
 */
