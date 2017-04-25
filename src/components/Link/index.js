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
 *     stroke='green',
 *     className='link',
 *     opacity=1,
 *     onClickLink={onClickLink} />
 */
export default class Link extends React.Component {
    /**
     * Handle link click event.
     * @return {undefined}
     */
    handleOnClickLink = () => this.props.onClickLink && this.props.onClickLink(this.props.source, this.props.target);

    shouldComponentUpdate(nextProps) {
        // Properties more likely to mutate are evaluated first to take advantage of short-circuit evaluation
        return nextProps.x1 !== this.props.x1 || nextProps.y1 !== this.props.y1
            || nextProps.x2 !== this.props.x2 || nextProps.y2 !== this.props.y2
            || nextProps.opacity !== this.props.opacity
            || nextProps.stroke !== this.props.stroke
            || nextProps.strokeWidth !== this.props.strokeWidth
            || nextProps.color !== this.props.color;
    }

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
