import React from 'react';
import {shallow} from 'enzyme';
import Link from '../src/components/Link';

test('Link Component', () => {
    const mockCallback = jest.fn();
    const link = shallow(
        <Link x1='2' y1='2' x2='4' y2='4' opacity='1' stroke='red' strokeWidth='2' onClickLink={mockCallback}/>
    );
    link.instance().handleOnClickLink();
    expect(mockCallback).toBeCalled();
});
