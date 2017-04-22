import React from 'react';
import renderer from 'react-test-renderer';

import Link from '../src/components/Link';

describe.only('Link Component', () => {
    let that = {};

    beforeEach(() => {
        that.callbackMock = jest.fn();

        that.link = renderer.create(
            <Link x1='2' y1='2' x2='4' y2='4' opacity='1' stroke='red' strokeWidth='2' onClickLink={that.callbackMock}/>
        );

        that.tree = that.link.toJSON();
    });

    test('should be properly rendered', () => {
        expect(that.tree).toMatchSnapshot();
    });

    test('should call callback function when onClick is performed', () => {
        that.tree.props.onClick();
        expect(that.callbackMock).toBeCalled();
    });
});
