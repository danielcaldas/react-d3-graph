import React from 'react';

/**
 * Link component is responsible for encapsulating link render.
 * @example
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * <Link
 *     source='idSourceNode'
 *     target='idTargetNode'
 *     x1=22
 *     y1=22
 *     x2=22
 *     y2=22
 *     strokeWidth=1.5
 *     stroke='green'
 *     className='link'
 *     opacity=1
 *     onClickLink={onClickLink} />
 */
export default class Link extends React.Component {
    /**
     * Handle link click event.
     */
    handleOnClickLink = () => this.props.onClickLink && this.props.onClickLink(this.props.source, this.props.target);

    render() {
        const lineStyle = {
            strokeWidth: this.props.strokeWidth,
            stroke: this.props.stroke,
            opacity: this.props.opacity
        };

        const lineProps = {
            className: this.props.className,
            onClick: this.handleOnClickLink,
            style: lineStyle,
            x1: this.props.x1,
            x2: this.props.x2,
            y1: this.props.y1,
            y2: this.props.y2
        };

        return (
            <line {...lineProps}/>
        );
    }
}
